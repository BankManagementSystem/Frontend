import { db } from '$lib/db'; // Assuming you already set up your MySQL connection

export async function GET() {
	try {
		// Fetch all loan applications
		const [rows] = await db.execute('SELECT L.FirstName, L.MiddleName, L.LastName, L.Email,Lo.Type, L.IssuedAmount, L.Tenure, L.Id, L.LoanTypeId, L.ROI FROM Loanapplication L JOIN LoanTypes Lo ON L.LoanTypeId = Lo.Id WHERE Status="Pending" Order BY L.Id ASC ');
		return new Response(JSON.stringify(rows), { status: 200 });
	} catch (error) {
		console.error('Error fetching loan applications:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch loan applications' }), { status: 500 });
	}
}
