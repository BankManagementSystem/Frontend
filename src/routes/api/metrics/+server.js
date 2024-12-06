import { db } from '$lib/db';

export async function GET() {
	try {
		// Fetch metrics
        const [activeAccounts] = await db.execute('SELECT COUNT(*) AS count FROM accounts');
		const [activeLoans] = await db.execute('SELECT COUNT(*) AS count FROM loans');
		const [pendingApprovals] = await db.execute(`SELECT COUNT(*) AS count FROM loanapplication WHERE Status = "Pending"`);
		const [transactions] = await db.execute('SELECT COUNT(*) AS count FROM transactions');

		const metrics = {
            activeAccounts: activeAccounts[0].count,
			activeLoans: activeLoans[0].count,
			pendingApprovals: pendingApprovals[0].count,
			transactions: transactions[0].count,
		};
		console.log(metrics)

		// Fetch data for bar chart (Accounts Opened Per Month)
		const [monthlyAccounts] = await db.execute(`
			SELECT MONTHNAME(MAX(Date)) AS month, COUNT(*) AS count
			FROM accounts
			GROUP BY MONTH(Date)
			ORDER BY MONTH(Date);
		`);
			console.log(monthlyAccounts);
		// Fetch data for pie chart (Gender Distribution)
		const [genderDistribution] = await db.execute(`
			SELECT Gender, COUNT(*) AS count
			FROM customers
			GROUP BY Gender;
		`);
			console.log(genderDistribution);
		// Combine all data into a single response
		const data = {
			metrics,
			monthlyAccounts,
			genderDistribution,
		};

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response('Error fetching data', { status: 500 });
	}
}

