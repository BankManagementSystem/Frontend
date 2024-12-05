import {db} from '$lib/db'; // Adjust based on your database setup

export async function GET() {
    // Example queries (adjust as needed for your database schema)
    const spendingQuery = `
        SELECT MONTHNAME(MAX(transactionDate)) AS month, SUM(amount) AS amount
        FROM dbtransaction
        WHERE Type = 'DR'
        GROUP BY MONTH(transactionDate)
        ORDER BY MONTH(transactionDate)
    `;

    const balanceTrendsQuery = `
        SELECT 
            DATE_FORMAT(transactionDate, '%Y-%m') AS date,
            AVG(balance) AS balance
        FROM 
            dbtransaction
        GROUP BY 
            DATE_FORMAT(transactionDate, '%Y-%m')
        ORDER BY 
            DATE_FORMAT(transactionDate, '%Y-%m');
    `;
    /*`
        SELECT transactionDate AS date, balance
        FROM transaction
        ORDER BY transactionDate
    ` */

    const depositsWithdrawalsQuery = `
        SELECT
            SUM(CASE WHEN Type = 'CR' THEN amount ELSE 0 END) AS deposits,
            SUM(CASE WHEN Type = 'DR' THEN amount ELSE 0 END) AS withdrawals
        FROM dbtransaction
        WHERE MONTH(transactionDate) = MONTH(CURDATE())
    `;

    try {
        const [spendingData] = await db.execute(spendingQuery);
        const [balanceTrends] = await db.execute(balanceTrendsQuery);
        const [totals] = await db.execute(depositsWithdrawalsQuery);
        return new Response(
            JSON.stringify({
                spendingData,
                balanceTrends,
                deposits: totals[0].deposits,
                withdrawals: totals[0].withdrawals,
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return new Response('Error fetching data', { status: 500 });
    }
}
