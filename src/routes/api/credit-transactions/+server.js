import {db} from '$lib/db';

export async function GET({url}) {
    const Id = url.searchParams.get('id');
    try{
        const card = await getCardById(Id);
        console.log("User details fetched successfully:", card);
        const cardId = card.Id;
        const [transactions] = await db.execute(
            `SELECT Date, Method, CP.Id, CB.Name, Amount
            FROM creditcardpayments CP, Cards C, CardBrands CB
            WHERE C.CardBrandId = CB.Id AND CP.CardId = C.Id AND C.Id = ?`,[cardId]);
        console.log(transactions)
        return new Response(JSON.stringify(transactions), { status: 200 });
    }catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}

async function getCardById(Id) {
    try {
        const [rows] = await db.query(
            `SELECT C.Id FROM Cards C, CardTypes CT WHERE C.CardTypeId = CT.Id AND C.CustomerId = ? AND CT.Name = "Credit"`,
            [Id]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", Id);
            return null; // No matching user
        }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");
    }
}