import { Request, Response, NextFunction } from 'express';
import * as orderModel from '../models/orderModel';
import { User } from '../models/userModel';

const getUserId = (req: Request): number => {
    const user = (req as any).user as User;
    if (!user || !user.id) throw new Error('User not authenticated');
    return user.id;
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const { address, city, zip, country } = req.body;

        // Basic address validation for shipping
        if (!address || !city || !zip) {
            res.status(400).json({ message: 'Shipping address, city and zip code are required' });
            return; // Stop execution
        }

        const order = await orderModel.createOrderFromCart(userId, { address, city, zip, country });
        res.status(201).json(order);
    } catch (err: any) {
        if (err.message.includes('stock') || err.message.includes('Cart is empty')) {
            res.status(400).json({ message: err.message });
        } else {
            next(err);
        }
    }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const orders = await orderModel.getOrdersByUserId(userId);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const orderId = Number(req.params.id);

        if (isNaN(orderId)) {
            res.status(400).json({ message: 'Invalid order ID' });
            return;
        }

        const order = await orderModel.getOrderById(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Security check: only owner or admin can view
        const userRole = (req as any).user.role;
        if (order.user_id !== userId && userRole !== 'admin') {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        res.json(order);
    } catch (err) {
        next(err);
    }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body;

        if (isNaN(orderId) || !status) {
            res.status(400).json({ message: 'Invalid ID or status' });
            return;
        }

        const validStatuses = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: 'Invalid status value' });
            return;
        }

        const success = await orderModel.updateOrderStatus(orderId, status);
        if (success) {
            const updated = await orderModel.getOrderById(orderId);
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        next(err);
    }
};
