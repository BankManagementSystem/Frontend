import { db } from '$lib/db'; // Import your database connection

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute(`SELECT C.Number, C.balance, C.CVV, C.CardLimit, C.IsActive FROM cards C, cardtypes CT  WHERE C.CustomerId = ? AND C.CardTypeId = CT.Id AND CT.Name = 'Credit' AND C.IsActive = TRUE`, [id]);
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}

