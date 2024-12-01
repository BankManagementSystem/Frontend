import { json } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { db } from "$lib/db"; // Assumes you're using a database abstraction layer
import crypto from 'crypto';
import dotenv from "dotenv";


dotenv.config(); // Loads environment variables from the `.env` file
const key = Buffer.from('44445555666677774444555566667777'); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function POST({ request }) {
    const { userId } = await request.json();
    console.log(userId)
    console.log("Received User ID");

    if (!userId) {
        return json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        // Fetch user details from the database
        const user = await getUserById(userId);
        console.log("User details fetched successfully:", user);

        if (!user) {
            return json({ error: "User not found" }, { status: 404 });
        }

        //const { email, password } = user;
        const email = user.Email;
        const password = user.Password;
        console.log(email, password)
        const pass = decrypt(password);
        console.log(pass);
        if (!email) {
            return json({ error: "Email not available for this user" }, { status: 404 });
        }

        // Message to send via email
        const subject = "Your Login Password";
        const text = `Hello, your login password is: ${pass}. Please keep it secure.`;

        // Send email
        const emailResult = await sendEmail(email, subject, text);

        if (emailResult.success) {
            return json({ message: "Email sent successfully!" }, { status: 200 });
        } else {
            return json({ error: emailResult.error }, { status: 500 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return json({ error: "Internal server error." }, { status: 500 });
    }
}

// Helper function to fetch user details from the database
async function getUserById(userId) {
    try {
        const [rows] = await db.query(
            "SELECT Email, Password FROM customerlogins WHERE Id = ?",
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
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
