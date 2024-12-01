// src/routes/api/login/+server.js
import { db } from '$lib/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEYC = process.env.SECRET_KEYC;

// Define key and initialization vector (IV)
const key = Buffer.from(SECRET_KEYC); // 32 bytes key for AES-256
const iv = Buffer.alloc(16, 0);

export async function POST({ request }) {
    const { userId, password } = await request.json();
    console.log("Login Api ",userId,password);
    const pass = encrypt(password);
    console.log("Encrypted = ",pass);
    try {
        const [rows] = await db.execute(
            'SELECT CustomerId FROM customerlogins WHERE Id = ? AND `Password` = ?',
            [userId, pass]
        );
        //console.log('Query result:', rows); // Log the result for debugging
        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign(
                { id: user.CustomerId },
                SECRET_KEY,
                { expiresIn: process.env.TOKEN_EXPIRY });
        await db.execute(`UPDATE customerlogins SET LastLogin = now() WHERE Id = ? `, [userId]);
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
function encrypt(text) {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }