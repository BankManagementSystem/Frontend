import {db} from '$lib/db';

export async function GET({url}) {
    const Id = url.searchParams.get('id');
    try{
        const [transactions] = await db.execute(
            `SELECT Date, Mode, Id, Description, Amount, ReceiverIFSC, Type
            FROM transactions 
            WHERE SenderAccountId = ?`,[Id]);
        console.log("Transactions",transactions)
        return new Response(JSON.stringify(transactions), { status: 200 });
    }catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch usernames" }), { status: 500 });
    }
}