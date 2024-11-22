// src/hooks.server.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = '9876';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('authToken') || event.request.headers.get('Authorization')?.split(' ')[1];

    if (event.url.pathname.startsWith('/Home') && token) {
        try {
            // Verify the token
            jwt.verify(token, SECRET_KEY);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                console.error('Token expired');
                return Response.redirect('/login'); // Handle token expiration specifically
            }
            console.error('Invalid token:', err);
            return Response.redirect('/login');
        }
    }

    return await resolve(event);
}
