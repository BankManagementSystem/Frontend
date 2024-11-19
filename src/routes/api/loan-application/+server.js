import { db } from '$lib/db';
import { User } from 'lucide-svelte';

export async function GET() {
    try {
        // Query all usernames from the users table
        const [rows] = await db.execute('SELECT * FROM Customers WHERE Id = ?',[User.toString()]);

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch" }), { status: 500 });
    }
}


export async function POST({ request }) {
    try {
        const {
            Firstname, Middlename, Lastname, email, phonenumber, aadhaar, Pancardno} = await request.json();

        // User does not exist, insert new user data into the database
        const [result] = await db.execute(
            'INSERT INTO Loanapplication (Firstname, Middlename, Lastname, email, phonenumber, Aadhaarnumber, Pancard) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Firstname, Middlename, Lastname, email, phonenumber, aadhaar, Pancardno]
        );

        if (result.affectedRows > 0) {
            return new Response(
            JSON.stringify({
                success: true,
                hasAccount: false,
                message: 'New user details saved successfully',
            }),
            { status: 200 }
            );
        } else {
            return new Response(
            JSON.stringify({ success: false, message: 'Failed to save new user details' }),
            { status: 400 }
            );
        }
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch or save user details' }), { status: 500 });
    }
}
