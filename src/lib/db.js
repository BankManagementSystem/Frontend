// src/lib/db.js
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nidhish05',
    database: 'bank'
});
