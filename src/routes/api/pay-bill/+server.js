import { db } from '$lib/db'; // Import your database connection
import { json } from "@sveltejs/kit";
import dotenv from "dotenv";
import crypto from 'crypto';

dotenv.config();

const SECRET_KEYT = process.env.SECRET_KEYT;

// Define key and initialization vector (IV)
const key = Buffer.from(SECRET_KEYT); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('SELECT Id, Balance, TPIN FROM accounts WHERE CustomerId = ?', [id]);
        console.log("Accounts Fecthed", rows);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { cardNumber, Account, amount, PIN} = await request.json();
        console.log(cardNumber, Account, amount, PIN)

        if (!cardNumber || !Account || !amount || !PIN ) {
            return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
        }

        // Fetch stored PIN hash for the account
        const [rows] = await db.execute(
            `SELECT TPIN, Balance FROM accounts WHERE Id = ?`,
            [Account]
        );

        const [rows2] = await db.execute(
            `SELECT Balance as CardBalance, CardLimit FROM cards WHERE Number = ?`,
            [cardNumber]
        );


        if (rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "Account not found" }), { status: 404 });
        }
        if (rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "Card not found" }), { status: 404 });
        }

        const storedHashedPIN = rows[0].TPin;
        const balance = rows[0].Balance;
        const cardBalance = rows2[0].CardBalance;
        const Limit = rows2[0].CardLimit;

        if (balance < amount) {
            return new Response(JSON.stringify({ success: false, message: "Amount exceeds bank balance" }), { status: 403 });
        }

        if (cardBalance + amount > Limit) {
            return new Response(JSON.stringify({ success: false, message: "Amount exceeds the Credit Card Limit" }), { status: 403 });
        }

        const hashedPIN = encrypt(PIN);
        console.log(hashedPIN);
        // Compare the stored hashed PIN with the provided hashed PIN
        if (storedHashedPIN != hashedPIN) {
            return new Response(JSON.stringify({ success: false, message: "Invalid transaction PIN" }), { status: 403 });
        }

        // Perform the balance update in a transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();
        try {
            // Update debit card balance
            const [accountResult] = await connection.execute(
                `UPDATE accounts SET Balance = Balance - ? WHERE Id = ?`,
                [amount, Account]
            );

            // Update credit card balance
            const [creditCardResult] = await connection.execute(
                `UPDATE cards SET Balance = Balance + ? WHERE Number = ?`,
                [amount, cardNumber]
            );

            // Check if both updates succeeded
            if (accountResult.affectedRows === 0 || creditCardResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return new Response(JSON.stringify({ success: false, message: "Update failed" }), { status: 400 });
            }

            // Commit the transaction
            await connection.commit();
            connection.release();

            return new Response(
                JSON.stringify({ success: true, message: "Balances updated successfully" }),
                { status: 200 }
            );
        } catch (error) {
            await connection.rollback();
            connection.release();
            console.error("Transaction error:", error);
            return new Response(JSON.stringify({ success: false, message: "Transaction failed" }), { status: 500 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    }
}
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

/*
// Helper function to fetch user details from the database
async function getUserById(userId) {
    try {
        const [rows] = await db.query(
            "SELECT C.Email AS email, CL.loginPin AS password FROM customers C, customerlogins CL WHERE C.Id = CL.CustomerId AND CL.Id = ?",
            [userId]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", userId);
            return null; // No matching user
        }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");
    }
}

// Helper function to send email using Nodemailer
async function sendEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your Gmail address
                pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to, // Recipient's email
            subject, // Email subject
            text, // Email body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Failed to send email." };
    }
}*/