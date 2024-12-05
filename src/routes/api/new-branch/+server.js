import {db} from '$lib/db';

export async function POST({ request }) {
    try {
        const {
            Name,
            IFSC,
            Address1,
            Address2,
            Address3,
            Address4,
            Address5,
            Manager,
            NOE,
            Phone,
            Email,
        } = await request.json();

        console.log("Incoming data:", { Name, IFSC, Address1, Address2, Address3, Address4, Address5, NOE, Phone, Email});

        // Validate required fields
        if (!Name || !IFSC || !Address1 || !Address2 || !Address3 || !Address4 || !Address5 || !Manager || !NOE || !Phone || !Email) {
            return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), { status: 400 });
        }

        // Connect to the database
        const connection = await db.getConnection();

        // Start a transaction
        await connection.beginTransaction();

        try {
            // Step 1: Insert into AddressTable
            const [addressResult] = await connection.execute(
                `INSERT INTO addresses (Address1, City, District, State, ZipCode) VALUES (?, ?, ?, ?, ?)`,
                [Address1, Address2, Address3, Address4, Address5]
            );
            console.log("Address inserted:", addressResult);

            const addressId = addressResult.insertId;

            // Step 2: Insert into CustomerTable
            const [customerResult] = await connection.execute(
                `INSERT INTO Branches(Name, IFSC, AddressId, SupervisorId, NoOfEmployees, Phone, Email) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [Name, IFSC, addressId, Manager, NOE, Phone ,Email]
            );
            console.log("Customer inserted:", customerResult);

            // Commit the transaction
            await connection.commit();

            return new Response(JSON.stringify({ success: true, message: 'Account created successfully' }), {
                status: 200,
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await connection.rollback();
            console.error('Transaction error:', error);
            return new Response(JSON.stringify({ success: false, message: 'Database error occurred' }), {
                status: 500,
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('API error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server error occurred' }), {
            status: 500,
        });
    }
};