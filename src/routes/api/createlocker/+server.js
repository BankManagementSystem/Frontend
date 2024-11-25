import { json } from '@sveltejs/kit';
import { db } from '$lib/db';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { accountId, type, size, startDate, endDate, deposit, rent } = body;

        // Validate inputs
        if (!accountId || !type || !size || !startDate || !endDate || !deposit || !rent) {
        return json({ error: 'All fields are required' }, { status: 400 });
        }

        // Insert into the database
        const [result] = await db.execute(
        `
        INSERT INTO lockers (accountId, type, size, startDate, endDate, deposit, rent)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [accountId, type, size, startDate, endDate, deposit, rent]
        );

        return json({ message: 'Locker created successfully', lockerId: result.insertId });
    } catch (error) {
        console.error('Error creating locker:', error);
        return json({ error: 'Failed to create locker' }, { status: 500 });
    }
    }
