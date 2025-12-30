import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { authenticateToken as protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);

export default router;
