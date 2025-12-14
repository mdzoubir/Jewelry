import { Request, Response } from 'express';
import * as userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { UserRole } from '../constants/roles';

export const index = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await userModel.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser({ name, email, password_hash });

        // Remove password_hash from response
        const { password_hash: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const success = await userModel.updateUser(id, req.body);
        if (success) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const success = await userModel.deleteUser(id);
        if (success) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findUserByEmail(email);

        if (!user || !user.password_hash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
