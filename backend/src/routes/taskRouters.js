import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController.js";

const router = express.Router();

// Create a new task
router.post('/', createTask);

// Get all tasks
router.get('/', getAllTasks);

// Update a task by ID
router.put('/:id', updateTaskById);

// Delete a task by ID
router.delete('/:id', deleteTaskById);

export default router;
