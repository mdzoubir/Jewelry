import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface InventoryItem {
    id: number;
    product_id: number;
    quantity: number;
    low_stock_threshold: number;
}

export const getInventoryByProductId = async (productId: number): Promise<InventoryItem | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM inventory WHERE product_id = ?', [productId]);
    return (rows.length > 0 ? rows[0] : null) as InventoryItem | null;
};

export const updateInventory = async (productId: number, quantity: number): Promise<boolean> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM inventory WHERE product_id = ?', [productId]);

    if (rows.length === 0) {
        await pool.query('INSERT INTO inventory (product_id, quantity) VALUES (?, ?)', [productId, quantity]);
        return true;
    }

    const [result] = await pool.query<ResultSetHeader>('UPDATE inventory SET quantity = ? WHERE product_id = ?', [quantity, productId]);
    return result.affectedRows > 0;
};
