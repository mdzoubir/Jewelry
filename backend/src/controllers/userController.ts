import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, phone, marketing_consent, profiling_consent } = req.body;

        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const userId = await userModel.createUser({
            name,
            email,
            password_hash,
            role: 'customer',
            phone,
            marketing_consent,
            profiling_consent
        });

        const token = jwt.sign({ id: userId, role: 'customer' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: userId, name, email, role: 'customer' } });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        next(err);
    }
};
