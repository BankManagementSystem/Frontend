import { db } from '$lib/db'; // Import your database connection

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('SELECT A.Id AS AccountId, D.Number, A.balance, D.CVV FROM accounts A, debits D WHERE A.Id = D.AccountId AND A.CustomerId = ?', [id]);
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}