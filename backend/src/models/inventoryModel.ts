import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface ProductInventory {
    id: number;
    product_id: number;
    stock: number;
}

export const getInventoryByProductId = async (productId: number): Promise<ProductInventory | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM product_inventory WHERE product_id = ?', [productId]);
    return (rows.length > 0 ? rows[0] : null) as ProductInventory | null;
};

export const updateInventory = async (productId: number, stock: number): Promise<boolean> => {
    // Check if inventory record exists
    const inventory = await getInventoryByProductId(productId);

    if (inventory) {
        const [result] = await pool.query<ResultSetHeader>('UPDATE product_inventory SET stock = ? WHERE product_id = ?', [stock, productId]);
        return result.affectedRows > 0;
    } else {
        // Create if not exists (upsert logic, though usually created with product)
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO product_inventory (product_id, stock) VALUES (?, ?)', [productId, stock]);
        return result.insertId > 0;
    }
};

export const adjustInventory = async (productId: number, delta: number): Promise<boolean> => {
    // Delta can be positive (restock) or negative (sale)
    // Use transactional logic or atomic update to prevent race conditions
    const [result] = await pool.query<ResultSetHeader>(
        'UPDATE product_inventory SET stock = stock + ? WHERE product_id = ? AND stock + ? >= 0',
        [delta, productId, delta]
    );
    return result.affectedRows > 0;
};
