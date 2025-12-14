import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { UserRole } from '../constants/roles';

export interface User {
    id?: number;
    name: string;
    email: string;
    password_hash?: string;
    phone?: string;
    marketing_consent?: boolean;
    profiling_consent?: boolean;
    oauth_provider?: string;
    oauth_id?: string;
    role?: UserRole;
    created_at?: Date;
    updated_at?: Date;
}

export const getAllUsers = async (): Promise<User[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone, role, created_at, updated_at FROM users');
    return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = ?', [id]);
    return (rows[0] as User) || null;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    return (rows[0] as User) || null;
};

export const createUser = async (user: User): Promise<User> => {
    const { name, email, password_hash, phone, marketing_consent, profiling_consent, oauth_provider, oauth_id, role } = user;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (name, email, password_hash, phone, marketing_consent, profiling_consent, oauth_provider, oauth_id, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, password_hash, phone, marketing_consent || false, profiling_consent || false, oauth_provider, oauth_id, role || UserRole.CUSTOMER]
    );
    return { id: result.insertId, ...user, role: role || UserRole.CUSTOMER };
};

export const updateUser = async (id: number, user: Partial<User>): Promise<boolean> => {
    // Dynamic query construction is safer and cleaner
    const fields = [];
    const values = [];

    if (user.name !== undefined) { fields.push('name = ?'); values.push(user.name); }
    if (user.email !== undefined) { fields.push('email = ?'); values.push(user.email); }
    if (user.password_hash !== undefined) { fields.push('password_hash = ?'); values.push(user.password_hash); }
    if (user.role !== undefined) { fields.push('role = ?'); values.push(user.role); }
    // Add other fields as necessary

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
