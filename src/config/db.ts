import 'dotenv/config'
import mysql from "mysql2";
import mysqlPromise from "mysql2/promise";

export const connectionPool = mysqlPromise.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
})