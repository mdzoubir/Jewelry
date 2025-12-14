import { Request, Response, NextFunction } from 'express';
import * as cartModel from '../models/cartModel';
import { User } from '../models/userModel';

// Helper to get user ID from request (populated by auth middleware)
const getUserId = (req: Request): number => {
    const user = (req as any).user as User;
    if (!user || !user.id) throw new Error('User not authenticated');
    return user.id;
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        let cart = await cartModel.getCartByUserId(userId);

        if (!cart) {
            cart = await cartModel.createCart(userId);
        }

        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity) {
            res.status(400).json({ message: 'Product ID and quantity are required' });
            return;
        }

        let cart = await cartModel.getCartByUserId(userId);
        if (!cart) {
            cart = await cartModel.createCart(userId);
        }

        await cartModel.addItemToCart(cart.id, product_id, quantity);

        // Return updated cart
        const updatedCart = await cartModel.getCartByUserId(userId);
        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req); // Ensure user owns cart (optional strict check, skipping for now)
        const itemId = Number(req.params.itemId);
        const { quantity } = req.body;

        if (isNaN(itemId) || quantity === undefined) {
            res.status(400).json({ message: 'Invalid item ID or quantity' });
            return;
        }

        await cartModel.updateCartItem(itemId, quantity);

        const updatedCart = await cartModel.getCartByUserId(userId);
        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};

export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const itemId = Number(req.params.itemId);

        if (isNaN(itemId)) {
            res.status(400).json({ message: 'Invalid item ID' });
            return;
        }

        await cartModel.removeItemFromCart(itemId);

        const updatedCart = await cartModel.getCartByUserId(userId);
        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);
        const cart = await cartModel.getCartByUserId(userId);

        if (cart) {
            await cartModel.clearCart(cart.id);
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
