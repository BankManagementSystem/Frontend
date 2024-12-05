import { db } from '$lib/db'; // Import the database connection

export async function GET({url}) {
    const cardNumber = url.searchParams.get('id'); // Get Id from query parameter
    console.log("CardNumber",cardNumber);
    // If Id is not provided, return an error
    if (!cardNumber) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query all usernames from the users table
        const [rows] = await db.execute('SELECT CL.Id, CL.DomesticAmount, CL.International, CL.Contactless, CL.Online, CL.ATM, CL.PosQr FROM cardlimits CL, Cards C WHERE CL.CardId = C.Id AND C.Number = ?',[cardNumber]);

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}

// src/routes/api/credit-save/+server.js

export async function POST({ request }) {
    try {
        const { cardid, Domi, IisChecked, CisChecked, OisChecked, AisChecked, PisChecked } = await request.json();
        console.log("Card Limit Card Id",cardid)
        // Log received data to ensure it matches what's being sent

        // Update query for the limits table based on the provided user ID
        const [result] = await db.execute(
            `UPDATE cardlimits SET DomesticAmount = ?, International = ?, Contactless = ?, Online = ?, ATM = ?, PosQr = ? WHERE Id = ?`,
            [Domi, IisChecked ? 1 : 0, CisChecked ? 1 : 0, OisChecked ? 1 : 0, AisChecked ? 1 : 0, PisChecked ? 1 : 0, cardid]
        );

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ success: true, message: "Card settings updated successfully" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: "Failed to update card settings" }), { status: 400 });
        }
    } catch (error) {
        console.error("Database update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update card settings" }), { status: 500 });
    }
}
