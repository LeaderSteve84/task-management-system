const express = require('express');
const { addTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create a new task (requires JWT authentication)
router.post('/tasks', authMiddleware, addTask);

// Retrieve all tasks for the authenticated user
router.get('/tasks', authMiddleware, getAllTasks);

// Update a specific task by ID (require JWT and task ownership)
router.put('/tasks/:id', authMiddleware, updateTask);

// Delete a specific task by ID (require JWT and task ownership)
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
