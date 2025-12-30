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

export const updateUser = async (id: number, userData: Partial<User>): Promise<void> => {
    const fields = Object.keys(userData).filter(key => key !== 'id' && key !== 'created_at' && key !== 'email' && key !== 'role'); // Protect email/role/id from direct update here if needed
    if (fields.length === 0) return;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => (userData as any)[field]);

    await pool.query(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
};

export const deleteUser = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
