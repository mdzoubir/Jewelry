import { body } from 'express-validator';

export const validateRegistration = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    body('privacy').isBoolean().custom(val => val === true).withMessage('Privacy policy must be accepted'),
    body('marketing_consent').optional().isBoolean(),
    body('profiling_consent').optional().isBoolean()
];

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];
