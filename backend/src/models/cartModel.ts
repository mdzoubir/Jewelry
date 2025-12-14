import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Cart {
    id: number;
    user_id: number;
    created_at: Date;
    items?: CartItem[];
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    // Joined fields
    product_name?: string;
    product_price?: number;
    product_image?: string;
}

export const getCartByUserId = async (userId: number): Promise<Cart | null> => {
    // Get Cart
    const [cartRows] = await pool.query<RowDataPacket[]>('SELECT * FROM carts WHERE user_id = ?', [userId]);
    if (cartRows.length === 0) return null;

    const cart = cartRows[0] as Cart;

    // Get Items with Product details
    const [itemRows] = await pool.query<RowDataPacket[]>(
        `SELECT ci.*, p.name as product_name, p.price as product_price, p.image_url as product_image 
         FROM cart_items ci 
         JOIN products p ON ci.product_id = p.id 
         WHERE ci.cart_id = ?`,
        [cart.id]
    );

    cart.items = itemRows as CartItem[];
    return cart;
};

export const createCart = async (userId: number): Promise<Cart> => {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    return { id: result.insertId, user_id: userId, created_at: new Date(), items: [] };
};

export const addItemToCart = async (cartId: number, productId: number, quantity: number): Promise<boolean> => {
    const [existing] = await pool.query<RowDataPacket[]>('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);

    if (existing.length > 0) {
        const newQuantity = existing[0].quantity + quantity;
        return updateCartItem(existing[0].id, newQuantity);
    } else {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
            [cartId, productId, quantity]
        );
        return result.insertId > 0;
    }
};

export const updateCartItem = async (itemId: number, quantity: number): Promise<boolean> => {
    if (quantity <= 0) {
        return removeItemFromCart(itemId);
    }
    const [result] = await pool.query<ResultSetHeader>('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId]);
    return result.affectedRows > 0;
};

export const removeItemFromCart = async (itemId: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM cart_items WHERE id = ?', [itemId]);
    return result.affectedRows > 0;
};

export const clearCart = async (cartId: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    return true; // Always return true even if empty
};
