import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface OrderItem {
    id?: number;
    order_id?: number;
    product_id: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address?: string;
    shipping_city?: string;
    shipping_zip?: string;
    shipping_country?: string;
    created_at: Date;
}

export const createOrder = async (userId: number, totalAmount: number, addressData?: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [orderResult] = await conn.query<ResultSetHeader>(
            'INSERT INTO orders (user_id, total_amount, shipping_address, shipping_city, shipping_zip, shipping_country) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, totalAmount, addressData?.address, addressData?.city, addressData?.zip, addressData?.country]
        );
        const orderId = orderResult.insertId;

        await conn.commit();
        return orderId;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

export const getOrderById = async (id: number): Promise<Order | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE id = ?', [id]);
    return (rows.length > 0 ? rows[0] : null) as Order | null;
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows as Order[];
};
