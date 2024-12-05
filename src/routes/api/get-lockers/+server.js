import { json } from '@sveltejs/kit';
import { db } from '$lib/db'; // Assuming $lib/db is your MySQL connection instance

export async function GET({ url }) {
    // Get selectedAccount from query parameters
    const selectedAccount = url.searchParams.get('accountId');

    if (!selectedAccount) {
        return json({ error: 'Account ID is required' }, { status: 400 });
    }

    try {
        // Fetch lockers where accountId matches the selected account
        const [rows] = await db.execute('SELECT LockerNumber,Type,Size,Rent,Deposit,StartDate,EndDate FROM Lockers WHERE AccountId = ?', [selectedAccount]);
        return json(rows); // Return locker details
    } catch (error) {
        console.error('Error fetching lockers:', error);
        return json({ error: 'Failed to fetch lockers' }, { status: 500 });
    }
}
