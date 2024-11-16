// src/routes/api/db-check/+server.js
import { db } from '$lib/db'; // Import the database connection setup

export async function GET() {
    try {
        // Run a query on the `users` table to check the connection and data retrieval
        const [rows] = await db.execute('SELECT username FROM users LIMIT 1');

        if (rows.length > 0) {
            return new Response(JSON.stringify({ success: true, message: "Database connected and users table accessed!" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: true, message: "Database connected, but no data in users table." }), { status: 200 });
        }
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(JSON.stringify({ success: false, message: "Database connection failed or users table not accessible." }), { status: 500 });
    }
}
