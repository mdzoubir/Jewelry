import { Request, Response, NextFunction } from 'express';
import * as inventoryModel from '../models/inventoryModel';

export const getInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.productId);
        if (isNaN(productId)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }

        const inventory = await inventoryModel.getInventoryByProductId(productId);
        if (!inventory) {
            // If no record, assume 0 stock or 404? 
            // Let's return 0 stock for seamless UX if product exists (frontend shouldn't care if row exists)
            // But strictly speaking, if product exists, inventory should probably exist or be 0.
            res.json({ product_id: productId, stock: 0 });
            return;
        }
        res.json(inventory);
    } catch (err) {
        next(err);
    }
};

export const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.productId);
        const stock = Number(req.body.stock);

        if (isNaN(productId) || isNaN(stock)) {
            res.status(400).json({ message: 'Invalid product ID or stock value' });
            return;
        }

        if (stock < 0) {
            res.status(400).json({ message: 'Stock cannot be negative' });
            return;
        }

        const success = await inventoryModel.updateInventory(productId, stock);

        if (success) {
            const updated = await inventoryModel.getInventoryByProductId(productId);
            res.json(updated);
        } else {
            res.status(500).json({ message: 'Failed to update inventory' });
        }
    } catch (err) {
        next(err);
    }
};
