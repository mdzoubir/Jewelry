import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { UserRole } from '../constants/roles';

const router = Router();

router.use(authenticateToken); // All order routes require login

// Customer Routes
router.post('/', orderController.createOrder); // Place Order
router.get('/', orderController.getMyOrders); // List My Orders
router.get('/:id', orderController.getOrder); // Get Order Details (Owner or Admin)

// Admin Routes
router.get('/admin/all', authorize([UserRole.ADMIN]), orderController.getAllOrders);
router.put('/:id/status', authorize([UserRole.ADMIN]), orderController.updateStatus);

export default router;
