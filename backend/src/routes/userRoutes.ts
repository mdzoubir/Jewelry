import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validateRegistration, validateLogin } from '../validators/userValidator';

import { authenticateToken as protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);

router.put('/profile', protect, userController.updateProfile);
router.delete('/profile', protect, userController.deleteAccount);

export default router;
