import { db } from '$lib/db'; // Assuming you already set up your MySQL connection

export async function GET() {
	try {
		// Fetch all loan applications
		const [rows] = await db.execute('SELECT * FROM Loanapplication');
		return new Response(JSON.stringify(rows), { status: 200 });
	} catch (error) {
		console.error('Error fetching loan applications:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch loan applications' }), { status: 500 });
	}
}
