import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Order {
    id: number;
    user_id: number;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    shipping_address: any;
    created_at: Date;
    items?: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    options?: any;
    product_name?: string;
    product_img?: string;
}

export const createOrder = async (userId: number, total: number, address: any, items: { productId: number; quantity: number; price: number; options?: any }[], paymentId?: string) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Create Order
        const [orderResult] = await connection.query<ResultSetHeader>(
            'INSERT INTO orders (user_id, total, shipping_address, status) VALUES (?, ?, ?, ?)',
            [userId, total, JSON.stringify(address), 'paid']
        );

        const orderId = orderResult.insertId;

        // 2. Create Order Items
        const itemValues = items.map(item => [
            orderId,
            item.productId,
            item.quantity,
            item.price,
            JSON.stringify(item.options || {})
        ]);

        if (itemValues.length > 0) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, options) VALUES ?',
                [itemValues]
            );
        }

        await connection.commit();
        return orderId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT 
            o.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', oi.id,
                    'order_id', oi.order_id,
                    'product_id', oi.product_id,
                    'quantity', oi.quantity,
                    'price', oi.price,
                    'options', oi.options,
                    'product_name', p.name,
                    'product_img', p.img
                )
            ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `, [userId]);

    return rows.map((row) => ({
        ...row,
        total: Number(row.total),
        shipping_address: typeof row.shipping_address === 'string' ? JSON.parse(row.shipping_address) : row.shipping_address,
        items: row.items ? (typeof row.items === 'string' ? JSON.parse(row.items) : row.items).map((i: any) => ({
            ...i,
            price: Number(i.price)
        })) : []
    })) as Order[];
};
