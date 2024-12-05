import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SECRET_KEYT = process.env.SECRET_KEYT;

// Define key and initialization vector (IV)
const key = Buffer.from(SECRET_KEYT); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { AccountId, Type, Size, Rent, Deposit, StartDate, EndDate, transactionPassword, } = body;

        // Validate inputs
        if (!AccountId || !Type || !Size || !Rent || !Deposit || !StartDate || !EndDate || !transactionPassword) {
            return json({ error: 'All fields are required' }, { status: 400 });
        }
        const pass = encrypt(transactionPassword);
        const [rows] = await db.execute(
            'SELECT TPIN FROM Accounts WHERE Id = ? LIMIT 1',
            [AccountId]
        );
        console.log(rows);

        if (rows[0].TPIN != pass) {
            throw new Error("*Invalid Transaction Password*");
        }

        // Insert into the database
        const [result] = await db.execute(
            `INSERT INTO Lockers (AccountId, Type, Size, Rent, Deposit, StartDate, EndDate)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [AccountId, Type, Size, Rent, Deposit, StartDate, EndDate]
        );

        const amount = Rent + Deposit;
        const senderInfo = await getBalance(AccountId);
        
        if (!senderInfo) {
            throw new Error("Sender account not found or is invalid.");
        }
        const BalanceBefore = senderInfo.BalanceBefore;
        const BalanceAfter = BalanceBefore - amount;
        
        await db.execute(`UPDATE Accounts SET Balance=? WHERE Id=?`,[BalanceAfter, AccountId]);
        
        return json({ message: 'Locker created successfully', lockerId: result.insertId });
    } catch (error) {
        console.error('Error creating locker:', error);
        return json({ error: 'Failed to create locker' }, { status: 500 });
    }
}
async function getBalance(AccountId) {
    try {
        const [rows] = await db.query(
            `SELECT Balance AS BalanceBefore
                FROM Accounts 
                WHERE Id = ?`,
            [AccountId]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", AccountId);
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