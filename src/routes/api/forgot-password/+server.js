import { json } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { db } from "$lib/db"; // Assumes you're using a database abstraction layer
import dotenv from "dotenv";

dotenv.config(); // Loads environment variables from the `.env` file

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

        const { email, password } = user;

        if (!email) {
            return json({ error: "Email not available for this user" }, { status: 404 });
        }

        // Message to send via email
        const subject = "Your Login Password";
        const text = `Hello, your login password is: ${password}. Please keep it secure.`;

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
}
