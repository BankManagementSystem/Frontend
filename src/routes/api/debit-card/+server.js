import { db } from '$lib/db'; // Import your database connection

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter
    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute(`SELECT A.Id AS AccountId, AT.Type, C.Id AS CardId, C.Number, A.Balance, C.CVV, C.ExpiryDate, C.Status FROM accounts A, accountstype AT, cards C, cardtypes CT WHERE A.Id = C.AccountId AND A.CustomerId = ? AND AT.Id = A.AccountTypeId AND CT.Name = 'Debit'`, [id]);
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}