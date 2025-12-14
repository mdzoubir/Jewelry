import pool from '../db';
import { ResultSetHeader, RowDataPacket, PoolConnection } from 'mysql2/promise';
import { Cart, CartItem } from './cartModel';

export interface Order {
    id: number;
    user_id: number;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    created_at: Date;
    items?: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
}

// Transactional Order Creation
export const createOrderFromCart = async (userId: number): Promise<Order> => {
    const connection: PoolConnection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Transaction: Validate Stock -> Create Order -> Move Items -> Decrement Stock -> Clear Cart
        const [cartItems] = await connection.query<RowDataPacket[]>(
            `SELECT ci.*, p.price, p.id as product_id, pi.stock 
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             LEFT JOIN product_inventory pi ON p.id = pi.product_id
             WHERE ci.cart_id = (SELECT id FROM carts WHERE user_id = ? LIMIT 1)`,
            [userId]
        );

        if (cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        let total = 0;
        for (const item of cartItems) {
            if ((item.stock || 0) < item.quantity) {
                throw new Error(`Insufficient stock for product ID ${item.product_id}`);
            }
            total += Number(item.price) * item.quantity;
        }

        const [orderRes] = await connection.query<ResultSetHeader>(
            'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
            [userId, total, 'pending']
        );
        const orderId = orderRes.insertId;

        for (const item of cartItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            await connection.query(
                'UPDATE product_inventory SET stock = stock - ? WHERE product_id = ?',
                [item.quantity, item.product_id]
            );
        }

        await connection.query(
            'DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = ? LIMIT 1)',
            [userId]
        );

        await connection.commit();

        return {
            id: orderId,
            user_id: userId,
            total,
            status: 'pending',
            created_at: new Date()
        };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows as Order[];
};

export const getAllOrders = async (): Promise<Order[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders ORDER BY created_at DESC');
    return rows as Order[];
};

export const getOrderById = async (orderId: number): Promise<Order | null> => {
    const [orderRows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (orderRows.length === 0) return null;

    const order = orderRows[0] as Order;

    const [itemRows] = await pool.query<RowDataPacket[]>('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    order.items = itemRows as OrderItem[];

    return order;
};

export const updateOrderStatus = async (orderId: number, status: string): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    return result.affectedRows > 0;
};
