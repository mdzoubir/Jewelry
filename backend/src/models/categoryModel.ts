import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Category {
    id?: number;
    parent_id?: number | null;
    name: string;
    slug: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories');
    return rows as Category[];
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories WHERE id = ?', [id]);
    return (rows[0] as Category) || null;
};

export const createCategory = async (category: Category): Promise<Category> => {
    const { parent_id, name, slug } = category;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO categories (parent_id, name, slug) VALUES (?, ?, ?)',
        [parent_id || null, name, slug]
    );
    return { id: result.insertId, ...category };
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<boolean> => {
    const fields = [];
    const values = [];

    if (category.parent_id !== undefined) { fields.push('parent_id = ?'); values.push(category.parent_id); }
    if (category.name !== undefined) { fields.push('name = ?'); values.push(category.name); }
    if (category.slug !== undefined) { fields.push('slug = ?'); values.push(category.slug); }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
