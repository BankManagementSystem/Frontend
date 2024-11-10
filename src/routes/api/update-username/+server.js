// src/routes/api/update-username/+server.js
import { db } from '$lib/db'; // Ensure you have your database connection setup

export async function POST({ request }) {
    try {
        const { id, newUsername } = await request.json();

        // Update the username in the users table based on the provided id
        const [result] = await db.execute('INSERT INTO users VALUES(?, ?)', [id, newUsername]);
        //UPDATE users SET username = ? WHERE id = ?
        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ success: true, message: "Username updated successfully" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: "Failed to update username" }), { status: 400 });
        }
    } catch (error) {
        console.error("Database update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update username" }), { status: 500 });
    }
}
