import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validateRegistration, validateLogin } from '../validators/userValidator';

const router = Router();

router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);

export default router;
