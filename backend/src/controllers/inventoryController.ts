import { Request, Response, NextFunction } from 'express';
import * as inventoryModel from '../models/inventoryModel';

export const getInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.productId);
        const inventory = await inventoryModel.getInventoryByProductId(productId);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json(inventory);
    } catch (err) {
        next(err);
    }
};

export const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.productId);
        const { quantity } = req.body;
        await inventoryModel.updateInventory(productId, quantity);
        res.json({ message: 'Inventory updated' });
    } catch (err) {
        next(err);
    }
};
