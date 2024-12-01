import { db } from '$lib/db'; // Import your database connection
import { json } from "@sveltejs/kit";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from 'crypto';

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('SELECT A.Id AS AccountId, status, balance, TPin FROM accounts A WHERE A.CustomerId = ?', [id]);
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { customerId, accountId, amount, hashedPIN } = await request.json();

        if (!accountId || !amount || !hashedPIN) {
            return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
        }

        // Fetch stored PIN hash for the account
        const [rows] = await db.execute(
            `SELECT TPin FROM accounts WHERE Id = ? AND CustomerId = ?`,
            [accountId, customerId]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "Account not found" }), { status: 404 });
        }

        const storedHashedPIN = rows[0].TPin;

        // Compare the stored hashed PIN with the provided hashed PIN
        if (storedHashedPIN != hashedPIN) {
            return new Response(JSON.stringify({ success: false, message: "Invalid transaction PIN" }), { status: 403 });
        }

        // Perform the balance update in a transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();
        /* To send an Email
        const user = await getUserById(userId);
        console.log("User details fetched successfully:", user);

        if (!user) {
            return json({ error: "User not found" }, { status: 404 });
        }

        const { email, password } = user;

        if (!email) {
            return json({ error: "Email not available for this user" }, { status: 404 });
        }

        // Message to send via email
        const subject = "Your Login Password";
        const text = `Hello, your login password is: ${password}. Please keep it secure.`;

        // Send email
        const emailResult = await sendEmail(email, subject, text);
        */
        try {
            // Update debit card balance
            const [accountResult] = await connection.execute(
                `UPDATE accounts SET balance = balance - ? WHERE Id = ?`,
                [amount, accountId]
            );

            // Update credit card balance
            const [creditCardResult] = await connection.execute(
                `UPDATE credits SET balance = balance + ? WHERE Id = ?`,
                [amount, 1]
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