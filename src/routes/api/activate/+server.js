import { db } from '$lib/db'; // Ensure you have your database connection setup

export async function POST({ request }) {
    try {
        const { cardid, SisChecked } = await request.json();
        console.log("Card Id",cardid, "Status",SisChecked);
        // Update the username in the users table based on the provided id
        const [result] = await db.execute(`UPDATE cards SET Status = ? WHERE Id = ? `,[SisChecked, cardid] );
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