import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: 'customer' | 'admin';
    phone?: string;
    marketing_consent?: boolean;
    profiling_consent?: boolean;
    created_at: Date;
}

export const getAllUsers = async (): Promise<User[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, role, phone, marketing_consent, profiling_consent, created_at FROM users');
    return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    return (rows.length > 0 ? rows[0] : null) as User | null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    return (rows.length > 0 ? rows[0] : null) as User | null;
};

export const createUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<number> => {
    const { name, email, password_hash, role, phone, marketing_consent, profiling_consent } = user;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (name, email, password_hash, role, phone, marketing_consent, profiling_consent) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, password_hash, role, phone, marketing_consent, profiling_consent]
    );
    return result.insertId;
};
