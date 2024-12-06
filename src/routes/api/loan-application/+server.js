import { json } from '@sveltejs/kit';
import { db } from '$lib/db'; // Import the database connection

export async function POST({ request }) {
    try {
        // Parse the JSON data from the request
        const {
            userDetails,
            loanDetails
        } = await request.json();

        const { FirstName, MiddleName, LastName, Email, MobileNo, AadhaarNo, PanCardNo, Status} = userDetails;
        const { LoanType, loanAmount, tenure, ROI } = loanDetails;
        console.log('Request body:', { FirstName, MiddleName, LastName, Email,
            MobileNo,
            AadhaarNo,
            PanCardNo,
        });

        const senderInfo = await getId(LoanType);
        if (!senderInfo) {
            throw new Error("Not found");
        }
        const LoanTypeId =senderInfo.LoanTypeId;


        // Insert data into the database
        const result = await db.execute(
            `INSERT INTO LoanApplication
            (FirstName, MiddleName, LastName, MobileNo, Email, AadhaarNo, PanCardNo, LoanTypeId, IssuedAmount, Tenure, ROI, Status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [FirstName, MiddleName, LastName, MobileNo, Email, AadhaarNo, PanCardNo, LoanTypeId, loanAmount, tenure, ROI, "Pending"]
        );
        
        
        const insertId = result?.[0]?.insertId || null;

        if (!insertId) {
            console.error('insertId is null or undefined');
            return json({ success: false, message: 'Failed to retrieve insertId' });
        }
        
        return json({
            success: true,
            message: 'Loan application saved successfully',
            Id: insertId,
        });
    } catch (error) {
        console.error('Error saving loan application:', error);
        return json({
            success: false,
            message: 'Failed to save loan application',
            error: error.message
        });
    }
}
async function getId(LoanType) {
    try {
        const [rows] = await db.query(
            `SELECT Id AS LoanTypeId FROM LoanTypes WHERE Type=?`,[LoanType]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", LoanType);
            return null; // No matching user
        }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");
    }
}