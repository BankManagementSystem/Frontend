import { db } from '$lib/db';

export async function POST({ request }) {
    try {
        const { transactionRefName, payFromAccount, payeesAccountNo, payeesIFSC, transactionDate, transactionMode, amount } = await request.json();

        // Example database query to insert the transaction details
        await db.execute(
        'INSERT INTO Transaction (transactionRefName, payFromAccount, payeesAccountNo, payeesIFSC, transactionDate, transactionMode, amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [transactionRefName, payFromAccount, payeesAccountNo, payeesIFSC, transactionDate, transactionMode, amount]
        );

        return new Response(JSON.stringify({ message: 'Payment confirmed!' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
