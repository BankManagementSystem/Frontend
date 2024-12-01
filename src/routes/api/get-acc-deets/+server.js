import { db } from '$lib/db'; // Import your database connection

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('Select B.IFSC, C.FirstName, C.LastName, B.Name as BName, AD.Address1, AD.City, AD.State, AD.country, C.MobileNo, C.Email, A1.Type, A.Date, A.Status, A.balance FROM Customers C, Addresses AD, Accounts A, Accountstype A1, Branches B WHERE C.Id = A.CustomerId AND A1.Id = A.AccountTypeId AND B.Id = A.BranchId AND C.AddressId = AD.Id AND A.Id = ?', [id]);

        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}