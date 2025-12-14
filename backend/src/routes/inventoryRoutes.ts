import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { UserRole } from '../constants/roles';

const router = Router();

// Public: Check Stock
router.get('/:productId', inventoryController.getInventory);

// Admin: Update Stock
router.put('/:productId', authenticateToken, authorize([UserRole.ADMIN]), inventoryController.updateInventory);

export default router;
