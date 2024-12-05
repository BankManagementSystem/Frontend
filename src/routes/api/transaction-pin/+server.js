import { db } from '$lib/db';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SECRET_KEYT = process.env.SECRET_KEYT;

// Define key and initialization vector (IV)
const key = Buffer.from(SECRET_KEYT); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function POST({ request }) {
    const {customerId, currentPin, newTransactionPIN } = await request.json();
    console.log("Received the credentials",customerId, currentPin, newTransactionPIN);
    const current = encrypt(currentPin); 
    if ( !currentPin || !newTransactionPIN) {
        return new Response(
            JSON.stringify({ success: false, message: 'Please fill in all fields.' }),
            { status: 400 }
        );
    }

    try {
        // Fetch the current login PIN from the database
        const [rows] = await db.execute('SELECT TPIN FROM accounts WHERE CustomerId = ?',[customerId]);

        // @ts-ignore
        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ success: false, message: 'Customer not found.'}),
                { status: 404 }
            );
        }

        const storedPin = rows[0].TPIN;
        console.log("Current password",current);
        console.log("Stored Password ",storedPin);
        // Validate current PIN
        if (storedPin != current) {
            return new Response(
                JSON.stringify({ success: false, message: 'The current PIN does not match.' }),
                { status: 401 }
            );
        }
        const newpass = encrypt(newTransactionPIN);
        console.log("New password",newpass);
        // Update the login PIN
        const [result] = await db.execute('UPDATE accounts SET TPIN = ? WHERE CustomerId = ?', [newpass, customerId]);

        if (result.affectedRows > 0) {
            return new Response(
                JSON.stringify({ success: true, message: 'Successfully changed the login PIN.' }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: 'Failed to update the login PIN.' }),
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error in changing PIN:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'An error occurred. Please try again later.' }),
            { status: 500 }
        );
    }
}

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}