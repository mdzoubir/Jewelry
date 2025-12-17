import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
}

export const getCartByUserId = async (userId: number): Promise<CartItem[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
    return rows as CartItem[];
};

export const addToCart = async (userId: number, productId: number, quantity: number): Promise<void> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId]);

    if (rows.length > 0) {
        const newQuantity = rows[0].quantity + quantity;
        await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, rows[0].id]);
    } else {
        await pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }
};

export const removeFromCart = async (userId: number, productId: number): Promise<void> => {
    await pool.query('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId]);
};

export const clearCart = async (userId: number): Promise<void> => {
    await pool.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);
};
