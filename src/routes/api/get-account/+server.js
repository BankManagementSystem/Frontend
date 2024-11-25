import { json } from '@sveltejs/kit';
import { db } from '$lib/db'; // Assuming db is your MySQL connection instance

export async function GET({url}) {
    const id = url.searchParams.get('id');
    try {
        const [accounts] = await db.execute(
        'SELECT accountNumber FROM account WHERE CustomerId = 1');

        // Transform the result into an array of account numbers
        const accountNumbers = accounts.map((row) => row.accountNumber);

        // Return the account numbers as JSON
        return json({ accounts: accountNumbers });
    } catch (error) {
        console.error('Error fetching account numbers:', error);
        return json({ error: 'Failed to fetch account numbers' }, { status: 500 });
    }
    }
