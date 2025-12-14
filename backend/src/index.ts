import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware';
import pool from './db';

import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
};

startServer();
