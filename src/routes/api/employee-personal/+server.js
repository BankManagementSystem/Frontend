import { db } from '$lib/db'; // Import the database connection

export async function GET({url}) {
    const employeeId = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!employeeId) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }
    try {
        // Query all usernames from the users table
        const [rows] = await db.execute('SELECT * FROM Employees E, Addresses A, Branches B WHERE B.Id = E.BranchId E.AddressId = A.Id AND E.Id = ? ', [employeeId]);

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}