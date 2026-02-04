import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { taskValidation, validate } from '../middleware/validation.js';

const router = express.Router();
router.get('/stats', protect, getTaskStats);
router.route('/').get(protect, getTasks).post(protect, taskValidation, validate, createTask);
router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, taskValidation, validate, updateTask)
  .delete(protect, deleteTask);

export default router;