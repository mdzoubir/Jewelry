import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateResource = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (e: any) {
        if (e instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: (e as any).errors
            });
        }
        return res.status(400).json({ message: e.message });
    }
};
