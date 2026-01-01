import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validateResource } from '../middleware/validationMiddleware';
import { registerSchema, loginSchema, updateProfileSchema } from '../schemas';

import { authenticateToken as protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', validateResource(registerSchema), userController.register);
router.post('/login', validateResource(loginSchema), userController.login);

// Auth verification
router.get('/me', protect, userController.getMe);

router.put('/profile', protect, validateResource(updateProfileSchema), userController.updateProfile);
router.delete('/profile', protect, userController.deleteAccount);

export default router;
