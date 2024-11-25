// src/lib/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a MySQL connection pool using environment variables
export const db = mysql.createPool({
    host: process.env.DB_Host,      // Database host
    user: process.env.DB_User,      // Database user
    password: process.env.DB_Password, // Database password
    database: process.env.DB_Database, // Database name
    dateStrings: true              // Format dates as strings
});