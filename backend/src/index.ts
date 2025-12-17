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

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

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
