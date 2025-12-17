import { Request, Response, NextFunction } from 'express';
import * as orderModel from '../models/orderModel';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { total_amount, shipping_address } = req.body;

        if (!total_amount) {
            return res.status(400).json({ message: 'Total amount is required' });
        }

        const orderId = await orderModel.createOrder(userId, total_amount, shipping_address);
        const newOrder = await orderModel.getOrderById(orderId);

        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const orders = await orderModel.getOrdersByUserId(userId);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};
