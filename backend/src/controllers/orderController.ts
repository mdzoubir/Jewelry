import { Request, Response } from 'express';
import * as orderModel from '../models/orderModel';
import * as cartModel from '../models/cartModel';
import { createOrderSchema } from '../schemas';
import { CONFIG } from '../config';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const validatedData = createOrderSchema.parse(req.body);
        const { shippingAddress } = validatedData;

        // 1. Get current cart items to validate prices and create strict order
        const cartItems = await cartModel.getCartByUserId(userId);

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total (Server-side validation)
        const itemsTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

        const shipping = CONFIG.SHIPPING_COST;
        const taxRate = CONFIG.TAX_RATE;
        const otherTax = CONFIG.OTHER_TAX;

        const taxAmount = itemsTotal * taxRate;
        const total = itemsTotal + shipping + taxAmount + otherTax;

        // 3. Prepare items for order
        const orderItems = cartItems.map(item => ({
            productId: item.product_id,
            quantity: item.quantity,
            price: Number(item.price),
            options: item.options
        }));

        // 4. Create Order
        const orderId = await orderModel.createOrder(userId, total, shippingAddress, orderItems);

        // 5. Clear Cart
        await cartModel.clearCart(userId);

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        console.error("Create Order Error:", error); // Keep for server logs, but maybe use a logger
        if (error instanceof Error && error.message.includes('validation')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error creating order' });
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const orders = await orderModel.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        console.error("Get My Orders Error:", error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
