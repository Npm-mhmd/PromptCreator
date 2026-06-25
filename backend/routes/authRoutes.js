import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerValidation,
  loginValidation,
  profileValidation,
  changePasswordValidation,
} from '../utils/validators.js';

const router = Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, profileValidation, updateUserProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);

export default router;
