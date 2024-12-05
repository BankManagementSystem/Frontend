import { db } from '$lib/db'; // Your database connection
import nodemailer from "nodemailer";


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
            BranchName,
        } = await request.json();

        console.log("Incoming data:", { FN, MN, LN, Address1, Address2, Address3, Address4, Address5, Gender, DOB, Phone, Email, Aadhaar, PAN, Type, BranchName });

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
                `INSERT INTO addresses (Address1, City, District, State, ZipCode) VALUES (?, ?, ?, ?, ?)`,
                [Address1, Address2, Address3, Address4, Address5]
            );
            console.log("Address inserted:", addressResult);

            const addressId = addressResult.insertId;

            // Step 2: Insert into CustomerTable
            const [customerResult] = await connection.execute(
                `INSERT INTO customers (FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Email, AadhaarNo, PanCardNo, AddressId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [FN, MN, LN, Gender, DOB, Phone, Email, Aadhaar, PAN, addressId]
            );
            console.log("Customer inserted:", customerResult);

            const customerId = customerResult.insertId;

            //Step 3: Insert into Customerlogins
            const [customerlogins] = await connection.execute(
                `INSERT INTO customerlogins(CustomerId, Email) VALUES (?, ?)`,
                [customerId, Email]
            );
            console.log("Customerlogins inserted:", customerlogins);
            const customerloginId = customerlogins.insertId;
            console.log(BranchName);
            const [branch] = await connection.execute(
                `SELECT Id FROM Branches WHERE Name = ?`, [BranchName]
            );
            console.log("BranchId fetched:", branch);
            const BranchId = branch[0].Id;
            console.log("BranchId", BranchId);
            /*
            const [accountTypeResult] = await connection.execute(
                `INSERT INTO accountstype (Type, MinBalance) VALUES (?, 0)`,
                [Type]
            );*/
            const senderInfo = await getId(Type);
            if (!senderInfo) {
                throw new Error("Not found");
            }

            const accounttypeId =senderInfo[0].Id;

            console.log("Account type inserted:", accountTypeResult);
            // Step 3: Insert into AccountsTable
            const [accountResult] = await connection.execute(
                `INSERT INTO accounts (AccountTypeId, CustomerId, BranchId, balance, status,  Date) VALUES (?, ?, ?, 0, "Active", CURDATE())`,
                [accounttypeId, customerId, BranchId]
            );
            console.log("Account inserted:", accountResult);

            const accountId = accountResult.insertId;

            // Step 4: Insert into AccountsTypeTable
            

            // Commit the transaction
            await connection.commit();
            const subject = "Your Login Id and Password";
            const text = `Hello, your login Id is: ${customerloginId} password is: 1234. Please change the password once you login.`;

            // Send email
            const emailResult = await sendEmail(Email, subject, text);

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

async function sendEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your Gmail address
                pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to, // Recipient's email
            subject, // Email subject
            text, // Email body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Failed to send email." };
    }
}

export async function GET() {
    try {
        // Query database based on the provided Id
        const [rows] = await db.execute('SELECT Name FROM branches');
        
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch credit card details" }), { status: 500 });
    }
}
async function getId(Type) {
    try {
        const [rows] = await db.query(
            `SELECT Id FROM accountstype WHERE Type=?`,[Type]
        );
        console.log("Query result:", rows);

        if (rows && rows.length > 0) {
            return rows[0]; // Return the first row
        } else {
            console.error("No user found with the provided ID:", Type);
            return null; // No matching user
        }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");
    }
}