import { db } from '$lib/db'; // Import your database connection
import crypto from 'crypto';

export async function GET({ url }) {
    const id = url.searchParams.get('id'); // Get Id from query parameter

    // If Id is not provided, return an error
    if (!id) {
        return new Response(JSON.stringify({ error: "Id is required" }), { status: 400 });
    }

    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('SELECT A.Id AS AccountId, status, balance, TPin FROM accounts A WHERE A.CustomerId = ?', [id]);
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { customerId, accountId, amount, hashedPIN } = await request.json();

        if (!accountId || !amount || !hashedPIN) {
            return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
        }

        // Fetch stored PIN hash for the account
        const [rows] = await db.execute(
            `SELECT TPin FROM accounts WHERE Id = ? AND CustomerId = ?`,
            [accountId, customerId]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "Account not found" }), { status: 404 });
        }

        const storedHashedPIN = rows[0].TPin;

        // Compare the stored hashed PIN with the provided hashed PIN
        if (storedHashedPIN != hashedPIN) {
            return new Response(JSON.stringify({ success: false, message: "Invalid transaction PIN" }), { status: 403 });
        }

        // Perform the balance update in a transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Update debit card balance
            const [accountResult] = await connection.execute(
                `UPDATE accounts SET balance = balance - ? WHERE Id = ?`,
                [amount, accountId]
            );

            // Update credit card balance
            const [creditCardResult] = await connection.execute(
                `UPDATE credits SET balance = balance + ? WHERE Id = ?`,
                [amount, 1]
            );

            // Check if both updates succeeded
            if (accountResult.affectedRows === 0 || creditCardResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return new Response(JSON.stringify({ success: false, message: "Update failed" }), { status: 400 });
            }

            // Commit the transaction
            await connection.commit();
            connection.release();

            return new Response(
                JSON.stringify({ success: true, message: "Balances updated successfully" }),
                { status: 200 }
            );
        } catch (error) {
            await connection.rollback();
            connection.release();
            console.error("Transaction error:", error);
            return new Response(JSON.stringify({ success: false, message: "Transaction failed" }), { status: 500 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
    }
}