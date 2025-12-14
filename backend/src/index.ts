import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware';
import pool from './db';
import { setupDatabase } from './setup-db';

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
// Serve static files from the "public" directory
// This allows accessing images at http://localhost:3000/uploads/filename.jpg
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

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
    // Try to connect to the database
    await pool.getConnection();
    console.log('Database connected successfully');
  } catch (err: any) {
    // If database doesn't exist, set it up
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
