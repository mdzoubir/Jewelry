import pool from './db';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { setupDatabase } from './setup-db';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UPLOADS_DIR = path.join(__dirname, '../public/uploads');
const BASE_URL = process.env.APP_URL || 'http://localhost:3000';

const ensureDirectoryExists = () => {
    if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        console.log(`Created uploads directory at: ${UPLOADS_DIR}`);
    }
};

const downloadImage = async (url: string, filename: string): Promise<string> => {
    try {
        const filepath = path.join(UPLOADS_DIR, filename);
        // Optimize: Don't re-download if exists (optional, but good for speed)
        if (fs.existsSync(filepath)) {
            // return `uploads/${filename}`;
        }

        const writer = fs.createWriteStream(filepath);

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(`uploads/${filename}`));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download image from ${url}`, error);
        return '';
    }
};

const seed = async () => {
    ensureDirectoryExists();

    // Drop tables to ensure fresh schema
    const connInit = await pool.getConnection();
    await connInit.query('SET FOREIGN_KEY_CHECKS = 0');
    await connInit.query('DROP TABLE IF EXISTS order_items, cart_items, orders, carts, products, categories, users');
    await connInit.query('SET FOREIGN_KEY_CHECKS = 1');
    connInit.release();

    await setupDatabase();
    const conn = await pool.getConnection();

    try {
        console.log('Seeding database...');

        // Data clearing is redundant now but harmless
        await conn.query('DELETE FROM cart_items');
        await conn.query('DELETE FROM carts');
        await conn.query('DELETE FROM order_items');
        await conn.query('DELETE FROM orders');
        await conn.query('DELETE FROM products');
        await conn.query('DELETE FROM categories');
        await conn.query('DELETE FROM users');

        console.log('Cleared existing data.');

        // 1. Create Users
        const passwordHash = await bcrypt.hash('password123', 10);
        const users = [
            { name: 'Admin User', email: 'admin@example.com', password_hash: passwordHash, role: 'admin' },
            { name: 'Test Customer', email: 'customer@example.com', password_hash: passwordHash, role: 'customer' }
        ];

        for (const user of users) {
            await conn.query(
                'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
                [user.name, user.email, user.password_hash, user.role]
            );
        }
        console.log('Users seeded.');

        // 2. Create Categories
        const categories = ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Watches', 'Gold Sets'];
        const categoryIds: number[] = [];

        for (const catName of categories) {
            const [result] = await conn.query(
                'INSERT INTO categories (name, slug) VALUES (?, ?)',
                [catName, faker.helpers.slugify(catName).toLowerCase()]
            ) as any;
            categoryIds.push(result.insertId);
        }
        console.log('Categories seeded.');

        // 3. Create Products with REAL Names and Images
        const products = [];
        console.log('Generating products...');

        // Curated Products List to match images
        const curatedProducts = [
            {
                name: 'Diamond & Sapphire Drop Earrings',
                image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop',
                price: 1250.00,
                categoryIndex: 1, // Earrings
                isBestSeller: true
            },
            {
                name: '18K Gold Pearl Pendant',
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
                price: 850.50,
                categoryIndex: 0, // Necklaces
                isBestSeller: true
            },
            {
                name: 'Luxury Diamond Solitaire Ring',
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
                price: 3400.00,
                categoryIndex: 3, // Rings
                isBestSeller: true
            },
            {
                name: 'Gold Chain Bracelet',
                image: 'https://images.unsplash.com/photo-1602751584552-641e46d8ae12?q=80&w=800&auto=format&fit=crop', // Gold bracelet
                price: 550.00,
                categoryIndex: 2, // Bracelets
                isBestSeller: true
            },
            {
                name: 'Modern Gold Hoop Earrings',
                image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop', // Earrings
                price: 299.99,
                categoryIndex: 1,
                isBestSeller: false
            },
            {
                name: 'Set of Gold Stacking Rings',
                image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop', // Gold rings
                price: 180.00,
                categoryIndex: 3,
                isBestSeller: false
            },
            {
                name: 'Elegant Emerald Necklace',
                image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800&auto=format&fit=crop', // Pendant
                price: 2100.00,
                categoryIndex: 0,
                isBestSeller: false
            },
            {
                name: 'Classic Silver Wedding Band',
                image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop', // Simple jewelry
                price: 450.00,
                categoryIndex: 3,
                isBestSeller: false
            },
            {
                name: 'Freshwater Pearl Necklace',
                image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop', // Pearl
                price: 600.00,
                categoryIndex: 0,
                isBestSeller: false
            },
            {
                name: 'Diamond Tennis Bracelet',
                image: 'https://images.unsplash.com/photo-1605100804763-ebea2406a95f?q=80&w=800&auto=format&fit=crop', // Luxury set/bracelet
                price: 4500.00,
                categoryIndex: 2,
                isBestSeller: false
            }
        ];

        // Double each item to get 20 products
        const allItems = [...curatedProducts, ...curatedProducts];

        for (let i = 0; i < allItems.length; i++) {
            const item = allItems[i];
            const categoryId = categoryIds[item.categoryIndex % categoryIds.length]; // Safe fallback
            const slug = faker.helpers.slugify(item.name).toLowerCase() + '-' + faker.string.nanoid(4);
            const filename = `${slug}.jpg`;

            // Download real image
            const localImageUrl = await downloadImage(item.image, filename);

            if (localImageUrl) {
                products.push([
                    categoryId,
                    item.name,
                    slug,
                    `Beautiful ${item.name} made with premium materials. Perfect for any occasion.`,
                    item.price,
                    localImageUrl,
                    faker.number.int({ min: 1, max: 100 }), // stock_quantity
                    false, // is_sold_out
                    item.isBestSeller
                ]);
                process.stdout.write('.');
            }
        }
        console.log('\nImages downloaded/verified.');

        if (products.length > 0) {
            await conn.query(
                'INSERT INTO products (category_id, name, slug, description, price, image_url, stock_quantity, is_sold_out, is_best_seller) VALUES ?',
                [products]
            );
            console.log('Products seeded.');
        }

        console.log('Database seeding completed successfully!');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        conn.release();
        process.exit();
    }
};

seed();
