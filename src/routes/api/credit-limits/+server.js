// src/routes/api/get-usernames/+server.js
import { db } from '$lib/db'; // Import the database connection

export async function GET() {
    try {
        // Query all usernames from the users table
        const [rows] = await db.execute('SELECT * FROM limits WHERE Id = 11');

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}

// src/routes/api/credit-save/+server.js

export async function POST({ request }) {
    try {
        const { user, Domi, IisChecked, CisChecked, OisChecked, AisChecked, PisChecked } = await request.json();

        // Log received data to ensure it matches what's being sent

        // Update query for the limits table based on the provided user ID
        const [result] = await db.execute(
            `UPDATE limits SET domistic = ?, international = ?, contact = ?, onlinee = ?, ATM = ?, QR = ? WHERE Id = ?`,
            [Domi, IisChecked ? 1 : 0, CisChecked ? 1 : 0, OisChecked ? 1 : 0, AisChecked ? 1 : 0, PisChecked ? 1 : 0, user]
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
