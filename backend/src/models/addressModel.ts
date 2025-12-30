import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Address {
    id: number;
    user_id: number;
    title: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    is_default: boolean;
    created_at: Date;
}

export const getAddressesByUserId = async (userId: number): Promise<Address[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC', [userId]);
    return rows as Address[];
};

export const addAddress = async (userId: number, addressData: Omit<Address, 'id' | 'user_id' | 'created_at'>): Promise<number> => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // If this is set to default, unset others
        if (addressData.is_default) {
            await connection.query('UPDATE addresses SET is_default = FALSE WHERE user_id = ?', [userId]);
        }

        const [result] = await connection.query<ResultSetHeader>(
            `INSERT INTO addresses (user_id, title, name, phone, street, city, zip, province, country, is_default)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, addressData.title, addressData.name, addressData.phone, addressData.street, addressData.city, addressData.zip, addressData.province, addressData.country, addressData.is_default]
        );

        await connection.commit();
        return result.insertId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const updateAddress = async (userId: number, addressId: number, addressData: Partial<Address>): Promise<void> => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Check ownership
        const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);
        if (existing.length === 0) throw new Error("Address not found or unauthorized");

        if (addressData.is_default) {
            await connection.query('UPDATE addresses SET is_default = FALSE WHERE user_id = ?', [userId]);
        }

        const fields = Object.keys(addressData).filter(key => key !== 'id' && key !== 'user_id' && key !== 'created_at');
        if (fields.length > 0) {
            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const values = fields.map(field => (addressData as any)[field]);

            await connection.query(`UPDATE addresses SET ${setClause} WHERE id = ?`, [...values, addressId]);
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const deleteAddress = async (userId: number, addressId: number): Promise<void> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);
    if (result.affectedRows === 0) throw new Error("Address not found or unauthorized");
};
