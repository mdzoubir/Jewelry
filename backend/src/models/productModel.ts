import pool from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Product {
    id: number;
    category_id: number | null;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    image_url: string | null;
    created_at: Date;
    updated_at: Date;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products');
    return rows as Product[];
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE category_id = ?', [categoryId]);
    return rows as Product[];
};

export const getProductById = async (id: number): Promise<Product | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
    return (rows.length > 0 ? rows[0] : null) as Product | null;
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE slug = ?', [slug]);
    return (rows.length > 0 ? rows[0] : null) as Product | null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<number> => {
    const { category_id, name, slug, description, price, image_url } = product;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO products (category_id, name, slug, description, price, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [category_id, name, slug, description, price, image_url]
    );
    return result.insertId;
};

export const updateProduct = async (id: number, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    const fields = [];
    const values = [];

    if (product.category_id !== undefined) {
        fields.push('category_id = ?');
        values.push(product.category_id);
    }
    if (product.name !== undefined) {
        fields.push('name = ?');
        values.push(product.name);
    }
    if (product.slug !== undefined) {
        fields.push('slug = ?');
        values.push(product.slug);
    }
    if (product.description !== undefined) {
        fields.push('description = ?');
        values.push(product.description);
    }
    if (product.price !== undefined) {
        fields.push('price = ?');
        values.push(product.price);
    }
    if (product.image_url !== undefined) {
        fields.push('image_url = ?');
        values.push(product.image_url);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
