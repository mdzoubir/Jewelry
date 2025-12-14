import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.put('/items/:itemId', cartController.updateItem);
router.delete('/items/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
