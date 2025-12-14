import { Request, Response, NextFunction } from 'express';
import * as categoryModel from '../models/categoryModel';

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const category = await categoryModel.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, slug, parent_id } = req.body;

        const newCategory = await categoryModel.createCategory({ name, slug, parent_id });
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const success = await categoryModel.updateCategory(id, req.body);
        if (!success) {
            return res.status(404).json({ error: 'Category not found or no changes' });
        }
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const success = await categoryModel.deleteCategory(id);
        if (!success) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
};
