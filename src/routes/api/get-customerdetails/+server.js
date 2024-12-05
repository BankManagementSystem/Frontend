import { db } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        // Extract customerId from query parameters
        const customerId = url.searchParams.get('customerId');
        if (!customerId) {
            return json({ success: false, error: 'Customer ID is required' }, { status: 400 });
        }

        // Query the database for the customer's details
        const [customer] = await db.query(
            `SELECT FirstName, MiddleName, LastName, Email, MobileNo, AadhaarNo, PanCardNo
            FROM Customers
            WHERE Id = ? AND IsActive = TRUE`,
            [customerId]
        );
        if (!customer) {
            return json({ success: false, error: 'Customer not found' }, { status: 404 });
        }

        return new Response(JSON.stringify(customer), { status:200});
    } catch (error) {
        console.error('Error fetching customer details:', error);
        return json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
    }
}
