import { db } from '$lib/db'; // Adjust based on your project structure

export async function POST({ request }) {
    try {
        const {
        LoanApplicationId,
        } = await request.json();
        
        await db.execute(`UPDATE LoanApplication SET Status="Rejected" WHERE Id = ?`,[LoanApplicationId]);


        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error rejecting loan:', error);
        return new Response(JSON.stringify({ error: 'Failed to reject loan' }), { status: 500 });
    }
    }
