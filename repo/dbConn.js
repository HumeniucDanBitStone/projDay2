import mysql from 'mysql2'
import dotenv from "dotenv/config";

const dbConn = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// dbConn.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database as id ' + dbConn.threadId);
// });
///Needed if reverted back to simple connection instead of Pooling

export default dbConn;