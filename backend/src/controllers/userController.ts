import { Request, Response, NextFunction } from 'express';
import * as userModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerSchema, loginSchema, updateProfileSchema } from '../schemas';
import { CONFIG } from '../config';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const existingUser = await userModel.getUserByEmail(validatedData.email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const password_hash = await bcrypt.hash(validatedData.password, 10);
        const userId = await userModel.createUser({
            name: validatedData.name,
            email: validatedData.email,
            password_hash,
            role: 'customer',
            phone: validatedData.phone,
            marketing_consent: validatedData.marketing_consent,
            profiling_consent: validatedData.profiling_consent
        });

        const token = jwt.sign({ id: userId, role: 'customer' }, CONFIG.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: userId, name: validatedData.name, email: validatedData.email, role: 'customer' } });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const user = await userModel.getUserByEmail(validatedData.email);

        if (!user || !(await bcrypt.compare(validatedData.password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, CONFIG.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const validatedData = updateProfileSchema.parse(req.body);

        const updateData: any = {};
        if (validatedData.name) updateData.name = validatedData.name;
        if (validatedData.phone) updateData.phone = validatedData.phone;
        if (validatedData.marketing_consent !== undefined) updateData.marketing_consent = validatedData.marketing_consent;
        if (validatedData.profiling_consent !== undefined) updateData.profiling_consent = validatedData.profiling_consent;

        if (validatedData.password) {
            updateData.password_hash = await bcrypt.hash(validatedData.password, 10);
        }

        await userModel.updateUser(userId, updateData);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude password hash
        const { password_hash, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (err) {
        next(err);
    }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        await userModel.deleteUser(userId);
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        next(err);
    }
};
