import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { UserRole } from '../constants/roles';
import { validateCategory } from '../validators/categoryValidator';

const router = Router();

// Public Routes
router.get('/', categoryController.index);
router.get('/:id', categoryController.show);

// Admin Routes
router.post('/', authenticateToken, authorize([UserRole.ADMIN]), validateCategory, categoryController.create);
router.put('/:id', authenticateToken, authorize([UserRole.ADMIN]), categoryController.update);
router.delete('/:id', authenticateToken, authorize([UserRole.ADMIN]), categoryController.remove);

export default router;
