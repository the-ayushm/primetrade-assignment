import express from 'express';
import {
  register,
  login,
  getMe,
  getAllUsers
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  validate
} from '../middleware/validation.js';

const router = express.Router();
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('admin'), getAllUsers);

export default router;