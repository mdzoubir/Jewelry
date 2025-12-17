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
        const { product_id, quantity } = req.body;
        await cartModel.addToCart(userId, product_id, quantity || 1);
        res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const productId = Number(req.params.id);
        await cartModel.removeFromCart(userId, productId);
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
