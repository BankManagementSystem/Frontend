// src/routes/api/login/+server.js
import { db } from '$lib/db';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '9876'; // Replace with a strong secret key

export async function POST({ request }) {
    const { userId, password } = await request.json();

    try {
        const [rows] = await db.execute(
            'SELECT CustomerId FROM customerlogins WHERE Id = ? AND loginPin = ?',
            [userId, password]
        );
        //console.log('Query result:', rows); // Log the result for debugging
        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign({ id: user.CustomerId }, SECRET_KEY, { expiresIn: '30m' });
            //console.log('Generated Token:', token);
            return new Response(JSON.stringify({ success: true, token }), { status: 200 });
        } else {
            console.log('No matching user found');
            return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), { status: 401 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server error. Please try again.' }), { status: 500 });
    }
    
}
