import { Request, Response, NextFunction } from 'express';
import * as productModel from '../models/productModel';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.query.category_id ? Number(req.query.category_id) : null;
        if (categoryId) {
            const products = await productModel.getProductsByCategory(categoryId);
            res.json(products);
        } else {
            const products = await productModel.getAllProducts();
            res.json(products);
        }
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }
        const product = await productModel.getProductById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_id, name, slug, description, price, image_url } = req.body;

        // Basic validation (can be improved with express-validator)
        if (!name || !price || !slug) {
            res.status(400).json({ message: 'Name, price, and slug are required' });
            return;
        }

        const newProductId = await productModel.createProduct({
            category_id,
            name,
            slug,
            description,
            price,
            image_url
        });

        const newProduct = await productModel.getProductById(newProductId);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }

        const success = await productModel.updateProduct(id, req.body);
        if (!success) {
            res.status(404).json({ message: 'Product not found' }); // Or no changes made/bad fields
            return;
        }

        const updatedProduct = await productModel.getProductById(id);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }

        const success = await productModel.deleteProduct(id);
        if (!success) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
