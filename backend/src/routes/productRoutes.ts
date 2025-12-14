import { Router } from 'express';
import * as productController from '../controllers/productController';

import { authenticateToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { UserRole } from '../constants/roles';

const router = Router();

// Public Routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin Routes
router.post('/', authenticateToken, authorize([UserRole.ADMIN]), productController.createProduct);
router.put('/:id', authenticateToken, authorize([UserRole.ADMIN]), productController.updateProduct);
router.delete('/:id', authenticateToken, authorize([UserRole.ADMIN]), productController.deleteProduct);

export default router;
