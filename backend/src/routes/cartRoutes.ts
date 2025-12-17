import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, cartController.getCart);
router.post('/', authenticateToken, cartController.addToCart);
router.delete('/:id', authenticateToken, cartController.removeFromCart);
router.delete('/', authenticateToken, cartController.clearCart);

export default router;
