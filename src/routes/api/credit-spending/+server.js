import {db} from '$lib/db'; // Replace with your actual DB connection

export async function GET({ url }) {
    const customerId = url.searchParams.get('customerId'); // Assuming customer ID is passed as a query param
    if (!customerId) {
        return new Response('Customer ID is required', { status: 400 });
    }

    try {
        // Fetch total spending grouped by month
        const spendingQuery = `
            SELECT 
                MONTHNAME(MAX(transaction_Date)) AS month,
                SUM(amount) AS total_spending
            FROM 
                credit_card_transactions
            WHERE 
                customer_id = ?
            GROUP BY 
                MONTH(transaction_Date)
            ORDER BY 
                MONTH(transaction_Date)
        `;

        const [spendingData] = await db.execute(spendingQuery, [customerId]);

        return new Response(JSON.stringify({ spending: spendingData }), { status: 200 });
    } catch (error) {
        console.error('Error fetching credit card spending:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
