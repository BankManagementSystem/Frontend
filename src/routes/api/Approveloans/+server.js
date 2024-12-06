import { db } from '$lib/db'; // Adjust based on your project structure

export async function POST({ request }) {
    try {
        const {
        LoanApplicationId,
        LoanTypeId,
        Tenure,
        ROI,
        IssuedAmount,
        RemainingAmount,
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


        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error approving loan:', error);
        return new Response(JSON.stringify({ error: 'Failed to approve loan' }), { status: 500 });
    }
    }
