import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    options?: any;
    name?: string;
    price?: number;
    image_url?: string;
    slug?: string;
    category_id?: number;
}

const getOrCreateCart = async (userId: number): Promise<number> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id FROM carts WHERE user_id = ?', [userId]);

    if (rows.length > 0) {
        return rows[0].id;
    } else {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO carts (user_id) VALUES (?)', [userId]);
        return result.insertId;
    }
};

export const getCartByUserId = async (userId: number): Promise<CartItem[]> => {
    const cartId = await getOrCreateCart(userId);
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT 
            ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.options,
            p.name, p.price, p.image_url, p.slug, p.category_id
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
    `, [cartId]);
    return rows as CartItem[];
};

export const addToCart = async (userId: number, productId: number, quantity: number, options?: any): Promise<void> => {
    const cartId = await getOrCreateCart(userId);

    const [items] = await pool.query<RowDataPacket[]>('SELECT id, quantity, options FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);

    const optionsString = JSON.stringify(options || {});

    const existingItem = items.find((item: any) => {
        const itemOptions = JSON.stringify(item.options || {});
        return itemOptions === optionsString;
    });

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id]);
    } else {
        await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity, options) VALUES (?, ?, ?, ?)',
            [cartId, productId, quantity, options ? JSON.stringify(options) : null]);
    }
};

export const removeFromCart = async (userId: number, productId: number): Promise<void> => {
    const cartId = await getOrCreateCart(userId);
    await pool.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
};

export const clearCart = async (userId: number): Promise<void> => {
    const cartId = await getOrCreateCart(userId);
    await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
};

export const removeCartItem = async (userId: number, itemId: number): Promise<void> => {
    const cartId = await getOrCreateCart(userId);
    await pool.query('DELETE FROM cart_items WHERE id = ? AND cart_id = ?', [itemId, cartId]);
};
