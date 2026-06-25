import { Router } from 'express';
import {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  toggleFavorite,
  getDashboardStats,
} from '../controllers/promptController.js';
import { protect } from '../middleware/authMiddleware.js';
import { promptValidation } from '../utils/validators.js';

const router = Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.post('/generate', promptValidation, createPrompt);
router.get('/', getPrompts);
router.get('/:id', getPromptById);
router.put('/:id', updatePrompt);
router.delete('/:id', deletePrompt);
router.post('/:id/favorite', toggleFavorite);

export default router;
