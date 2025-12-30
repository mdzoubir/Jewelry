import { Request, Response } from 'express';
import * as wishlistModel from '../models/wishlistModel';

export const getWishlist = async (req: Request, res: Response) => {
    try {
        // @ts-ignore - user is attached by auth middleware
        const userId = req.user.id;
        const wishlist = await wishlistModel.getWishlistByUserId(userId);
        res.json(wishlist);
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
};

export const toggleWishlist = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Check if item is already in wishlist
        const currentWishlist = await wishlistModel.getWishlistByUserId(userId);
        const exists = currentWishlist.find(item => item.product_id === Number(productId));

        if (exists) {
            await wishlistModel.removeFromWishlist(userId, Number(productId));
            return res.json({ message: 'Removed from wishlist', action: 'removed', productId });
        } else {
            await wishlistModel.addToWishlist(userId, Number(productId));
            return res.json({ message: 'Added to wishlist', action: 'added', productId });
        }

    } catch (error) {
        console.error("Toggle Wishlist Error:", error);
        res.status(500).json({ message: 'Error updating wishlist' });
    }
};
