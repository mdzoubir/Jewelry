import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database ${process.env.DB_NAME} created or already exists.`);

        await connection.query(`USE \`${process.env.DB_NAME}\``);

        const schemaPath = path.join(__dirname, '../../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        const statements = schema.split(';').filter(stmt => stmt.trim());

        for (const statement of statements) {
            if (statement.trim()) {
                await connection.query(statement);
            }
        }
        console.log('Schema applied successfully.');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();
