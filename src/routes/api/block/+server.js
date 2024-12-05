import { db } from '$lib/db'; // Ensure you have your database connection setup

export async function POST({ request }) {
    try {
        const { cardNumber, cardIsActive } = await request.json();
        console.log("Inside Block API");
        console.log(cardNumber, cardIsActive);
        // Update the username in the users table based on the provided id
        const [result] = await db.execute('UPDATE cards SET IsActive = ? WHERE Number = ?', [cardIsActive, cardNumber]);
        //UPDATE users SET username = ? WHERE id = ?
        if (result.affectedRows > 0) {
            console.log("Success");
            return new Response(JSON.stringify({ success: true, message: "Card Blocked" }), { status: 200 });
        } else {
            console.log("Failure");
            return new Response(JSON.stringify({ success: false, message: "Failed to block" }), { status: 400 });
        }
    } catch (error) {
        console.error("Database update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update username" }), { status: 500 });
    }
}