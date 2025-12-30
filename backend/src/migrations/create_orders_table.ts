import pool from '../db';

const createOrdersTable = async () => {
    const createOrdersQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
        shipping_address JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    const createOrderItemsQuery = `
    CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        options JSON,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    `;

    try {
        await pool.query(createOrdersQuery);
        await pool.query(createOrderItemsQuery);
        console.log("Orders tables created successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error creating orders tables:", error);
        process.exit(1);
    }
};

createOrdersTable();
