import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    TAX_RATE: 0.10,
    SHIPPING_COST: 15.00,
    OTHER_TAX: 20.00,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000
};
