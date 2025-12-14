import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCategory = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('parent_id').optional({ nullable: true }).isInt().withMessage('Parent ID must be an integer'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
