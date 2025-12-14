import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constants/roles';

export const authorize = (roles: UserRole[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    };
};
