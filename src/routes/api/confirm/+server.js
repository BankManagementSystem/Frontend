import { db } from '$lib/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SECRET_KEYT = process.env.SECRET_KEYT;

// Define key and initialization vector (IV)
const key = Buffer.from(SECRET_KEYT); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function POST({ request }) {
    try {
        const {
            transactionRefName:Description,
            payFromAccount: SenderAccountId,
            payeesAccountNo: ReceiverAccountId,
            payeesIFSC: ReceiverIFSC,
            transactionDate: Date,
            transactionMode: Mode,
            amount: Amount,
            type: Type,
            transactionPassword: Password,
        } = await request.json();
        const pass = encrypt(Password);
        const [rows] = await db.execute(
            'SELECT TPIN FROM Accounts WHERE Id = ? LIMIT 1',
            [SenderAccountId]
        );
        if(rows[0].TPIN != pass){
            throw new Error("*Invalid Transaction Password*");
        }
        const senderInfo = await getIFSC(SenderAccountId);
        console.log(senderInfo);
        if (!senderInfo) {
            throw new Error("Sender account not found or is invalid.");
        }
        
        const SenderIFSC = senderInfo.IFSC;
        const BalanceBefore=senderInfo.BalanceBefore;
        console.log(SenderIFSC, BalanceBefore);
        // Insert transaction into the Transactions table
        const [tr] =await db.execute(
            `INSERT INTO Transactions( Type, SenderAccountId, ReceiverAccountId, Mode, Status, SenderIFSC, ReceiverIFSC, Description, Amount, BalanceBefore, BalanceAfter, Date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Type, SenderAccountId, ReceiverAccountId, Mode, 'Completed', SenderIFSC, ReceiverIFSC, Description, Amount, BalanceBefore, BalanceBefore, Date]
        );
        console.log("Inserted successfully",tr);

        const BalanceAfter = BalanceBefore - Amount;
        const TransactionId = tr.insertId;
        // Ensure sufficient balance
        if (BalanceBefore < Amount) {
            await db.execute(`
                UPDATE Transactions
                SET Status = 'Failed'
                WHERE Id=?`,[TransactionId]
                );
            throw new Error("Insufficient balance in the sender's account.");
        }
        
        await db.execute(`
            UPDATE Transactions
            SET BalanceAfter=?
            WHERE Id=?`,[BalanceAfter, TransactionId]
            );
        await db.execute(`UPDATE Accounts SET Balance=? WHERE Id=?`,[BalanceAfter, SenderAccountId]);
        return new Response(JSON.stringify({ message: 'Payment confirmed!' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
async function getIFSC(SenderAccountId) {
    try {
        const [rows] = await db.query(
            `SELECT B.IFSC AS IFSC, A.Balance AS BalanceBefore
                FROM Accounts A
                JOIN Branches B ON A.BranchId = B.Id
                WHERE A.Id = ?`,
            [SenderAccountId]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", SenderAccountId);
            return null; // No matching user
        }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");
    }
}
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}