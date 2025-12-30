import pool from '../db';

const createWishlistTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS wishlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_wishlist (user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    `;

    try {
        await pool.query(query);
        console.log("Wishlists table created successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error creating wishlists table:", error);
        process.exit(1);
    }
};

createWishlistTable();
