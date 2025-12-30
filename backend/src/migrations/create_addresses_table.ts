import pool from '../db';

const createAddressesTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        province VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    try {
        await pool.query(query);
        console.log("Addresses table created successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error creating addresses table:", error);
        process.exit(1);
    }
};

createAddressesTable();
