import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { validateRegistration, validateLogin } from '../validators/userValidator';
import { UserRole } from '../constants/roles';

const router = Router();

router.post('/login', validateLogin, userController.login);
router.post('/', validateRegistration, userController.create);

// Protected Routes
router.use(authenticateToken); // Apply auth middleware to all subsequent routes

router.get('/', authorize([UserRole.ADMIN]), userController.index); // Only admin can list everyone
router.get('/:id', userController.show); // Authenticated users can see profiles (could restrict further)
router.put('/:id', userController.update); // Logic should handle "own profile" check in Controller if detailed
router.delete('/:id', authorize([UserRole.ADMIN]), userController.remove); // Only admin can delete

export default router;
