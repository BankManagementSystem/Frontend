import { db } from '$lib/db'; // Import your database connection

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter
    console.log("Null", id);
    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('Select E.FirstName, E.MiddleName, E.LastName, ED.Designation FROM Employees E, EmployeesDesignation ED WHERE E.DesignationId = ED.Id AND E.Id = ?', [id]);
        console.log("Rows",rows);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}