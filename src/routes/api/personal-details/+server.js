import { db } from '$lib/db'; // Import the database connection

export async function GET() {
    try {
        // Query all usernames from the users table
        const [rows] = await db.execute('SELECT * FROM personaldetails');

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}