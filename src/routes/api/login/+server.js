// src/routes/api/login/+server.js
import { db } from '$lib/db';

export async function POST({ request }) {
    const { username, password } = await request.json();

    try {
        // Query database for the user with matching username and password
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            // User exists, login successful
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            // Invalid credentials
            return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), { status: 401 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server error. Please try again.' }), { status: 500 });
    }
}
