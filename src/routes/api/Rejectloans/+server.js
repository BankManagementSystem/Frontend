import { db } from '$lib/db'; // Adjust based on your project structure
import nodemailer from "nodemailer";

export async function POST({ request }) {
    try {
        const {
        LoanApplicationId,
        Email,
        } = await request.json();
        
        await db.execute(`UPDATE LoanApplication SET Status="Rejected" WHERE Id = ?`,[LoanApplicationId]);

        const subject = "Loan Application";
        const text = `Hello, your loan application - ${LoanApplicationId} has been rejected. Please contact the bank for any queries.`;

        const emailResult = await sendEmail(Email, subject, text);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error rejecting loan:', error);
        return new Response(JSON.stringify({ error: 'Failed to reject loan' }), { status: 500 });
    }
    }

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
