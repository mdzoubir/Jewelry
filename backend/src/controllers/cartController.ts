import { Request, Response, NextFunction } from 'express';
import * as cartModel from '../models/cartModel';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const cart = await cartModel.getCartByUserId(userId);
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { product_id, quantity, options } = req.body;

        const product = await import('../models/productModel').then(m => m.getProductById(product_id));

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        if (product.is_sold_out) {
            res.status(400).json({ message: 'Cannot add sold out item to cart' });
            return;
        }

        if (product.stock_quantity < (quantity || 1)) {
            res.status(400).json({ message: 'Insufficient stock' });
            return;
        }

        await cartModel.addToCart(userId, product_id, quantity || 1, options);
        res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const itemId = Number(req.params.id);
        await cartModel.removeFromCart(userId, itemId);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        await cartModel.clearCart(userId);
        res.status(200).json({ message: 'Cart cleared' });
    } catch (err) {
        next(err);
    }
};
