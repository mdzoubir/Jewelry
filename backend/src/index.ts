import express from 'express';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './middleware/errorMiddleware';
import pool from './db';
import { setupDatabase } from './setup-db';

import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

import carteRoutes from './routes/cartRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import wishlistRoutes from './routes/wishlistRoutes';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Vite default
    'http://localhost:4173', // Vite preview
    process.env.FRONTEND_URL || ''
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
import addressRoutes from './routes/addressRoutes';
app.use('/api/addresses', addressRoutes);
import contactRoutes from './routes/contactRoutes';
app.use('/api/contact', contactRoutes);
app.use('/api/cart', carteRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected successfully');
    } catch (err: any) {
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('Database not found. Running setup...');
            try {
                await setupDatabase();
                console.log('Database setup completed. Reconnecting...');
            } catch (setupErr) {
                console.error('Failed to setup database:', setupErr);
                process.exit(1);
            }
        } else {
            console.error('Failed to connect to database:', err);
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Backend listening on http://localhost:${PORT}`);
    });
};

startServer();
