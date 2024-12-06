import { db } from '$lib/db'; // Adjust based on your project structure
import nodemailer from "nodemailer";

export async function POST({ request }) {
    try {
        const {
        LoanApplicationId,
        LoanTypeId,
        Tenure,
        ROI,
        IssuedAmount,
        RemainingAmount,
        Email,
        } = await request.json();

        // Insert the approved loan into the Loans table
        const query = `INSERT INTO Loans ( LoanApplicationId, LoanTypeId, Tenure, ROI, IssuedAmount, RemainingAmount, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.query(query, [
        LoanApplicationId,
        LoanTypeId,
        Tenure,
        ROI,
        IssuedAmount,
        RemainingAmount,
        'Ongoing'
        ]);
        await db.execute(`UPDATE LoanApplication SET Status="Approved" WHERE Id = ?`,[LoanApplicationId]);

        const subject = "Loan Application";
        const text = `Hello, your loan application - ${LoanApplicationId} has been approved. Please wait for the employee to contact you for further instructions.`;

        const emailResult = await sendEmail(Email, subject, text);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error approving loan:', error);
        return new Response(JSON.stringify({ error: 'Failed to approve loan' }), { status: 500 });
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