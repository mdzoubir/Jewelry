import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface WishlistItem {
    id: number;
    user_id: number;
    product_id: number;
    created_at: Date;
    product?: any; // To store joined product data
}

export const addToWishlist = async (userId: number, productId: number): Promise<WishlistItem> => {
    // Check if exists first
    const [existing] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?',
        [userId, productId]
    );

    if (existing.length > 0) {
        throw new Error('Item already in wishlist');
    }

    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
    );

    const [newItem] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM wishlists WHERE id = ?',
        [result.insertId]
    );

    return newItem[0] as WishlistItem;
};

export const removeFromWishlist = async (userId: number, productId: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?',
        [userId, productId]
    );
    return result.affectedRows > 0;
};

export const getWishlistByUserId = async (userId: number): Promise<WishlistItem[]> => {
    const query = `
        SELECT w.*, 
               p.id as p_id, p.name, p.price, p.img as product_img, p.image_url, p.is_best_seller, p.is_sold_out
        FROM wishlists w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = ?
        ORDER BY w.created_at DESC
    `;

    const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);

    return rows.map(row => ({
        id: row.id,
        user_id: row.user_id,
        product_id: row.product_id,
        created_at: row.created_at,
        product: {
            id: row.p_id,
            name: row.name,
            price: row.price,
            img: row.product_img, // Keep backend naming, frontend handles mapping
            image_url: row.image_url,
            isBestSeller: Boolean(row.is_best_seller),
            isSoldOut: Boolean(row.is_sold_out)
        }
    }));
};
