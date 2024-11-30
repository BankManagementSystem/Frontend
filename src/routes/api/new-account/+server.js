import { db } from '$lib/db'; // Your database connection

export async function POST({ request }) {
    try {
        const {
            FN,
            MN = null, // Allow middle name to be null
            LN,
            Address1,
            Address2,
            Address3,
            Address4,
            Address5,
            Gender,
            DOB,
            Phone,
            Email,
            Aadhaar,
            PAN,
            Type,
            BranchId
        } = await request.json();

        console.log("Incoming data:", { FN, MN, LN, Address1, Address2, Address3, Address4, Address5, Gender, DOB, Phone, Email, Aadhaar, PAN, Type });

        // Validate required fields
        if (!FN || !LN || !Address1 || !Address2 || !Address3 || !Address4 || !Address5 || !Gender || !DOB || !Phone || !Email || !Aadhaar || !PAN || !Type) {
            return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), { status: 400 });
        }

        // Connect to the database
        const connection = await db.getConnection();

        // Start a transaction
        await connection.beginTransaction();

        try {
            // Step 1: Insert into AddressTable
            const [addressResult] = await connection.execute(
                `INSERT INTO address (Address1, City, District, State, ZipCode) VALUES (?, ?, ?, ?, ?)`,
                [Address1, Address2, Address3, Address4, Address5]
            );
            console.log("Address inserted:", addressResult);

            const addressId = addressResult.insertId;

            // Step 2: Insert into CustomerTable
            const [customerResult] = await connection.execute(
                `INSERT INTO custom (FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Email, AadhaarNo, PanCardNo, AddressId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [FN, MN, LN, Gender, DOB, Phone, Email, Aadhaar, PAN, addressId]
            );
            console.log("Customer inserted:", customerResult);

            const customerId = customerResult.insertId;

            // Step 3: Insert into AccountsTable
            const [accountResult] = await connection.execute(
                `INSERT INTO accounts (CustomerId, balance, status, BranchId, Date) VALUES (?, 0, "Active", ?, NOW())`,
                [customerId, BranchId]
            );
            console.log("Account inserted:", accountResult);

            const accountId = accountResult.insertId;

            // Step 4: Insert into AccountsTypeTable
            const [accountTypeResult] = await connection.execute(
                `INSERT INTO accounttypes (AccountId, Type, MinBalance) VALUES (?, ?, 500)`,
                [accountId, Type]
            );
            console.log("Account type inserted:", accountTypeResult);

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
