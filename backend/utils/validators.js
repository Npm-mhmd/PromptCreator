import { body } from 'express-validator';

export const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const promptValidation = [
  body('originalIdea')
    .trim()
    .notEmpty()
    .withMessage('Original idea is required')
    .isLength({ max: 1000 })
    .withMessage('Idea cannot exceed 1000 characters'),
  body('skill')
    .trim()
    .notEmpty()
    .withMessage('Skill category is required'),
  body('level')
    .trim()
    .notEmpty()
    .withMessage('Experience level is required'),
  body('promptType')
    .trim()
    .notEmpty()
    .withMessage('Prompt type is required'),
];

export const profileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('avatar')
    .optional()
    .trim(),
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];
