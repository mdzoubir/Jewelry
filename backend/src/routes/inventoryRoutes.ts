import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController';
import { authenticateToken } from '../middleware/authMiddleware'; // Assuming admin check needed later

const router = Router();

router.get('/:productId', inventoryController.getInventory);
router.put('/:productId', inventoryController.updateInventory);

export default router;
