const Task = require('../models/Task.model');

// Allowed status values for tasks
const VALID_STATUSES = ['pending', 'in-progress', 'completed'];

// Add new task
const addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status } = req.body;

    // Validate input
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must not be a non-empty string',
      });
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    // Create task
    const task = await Task.create({
      userId,
      title: title.trim(),
      description: description.trim() || '',
      status: status || 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Task added successfully',
      data: task,
    });

  } catch (error) {
    console.error('Error adding task:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to add task',
      error: error.message,
    });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    if (!tasks.length) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found for this user',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Taks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({
      success: false,
      message: 'Faileed to fetch tasks',
      error: error.message,
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descripton, status } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (title. description, or status) is required to update',
      });
    }
    if (title && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'Title must be a non-empty string',
      });
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    // Prepare update object
    const updates = {};
    if (title) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (status) updates.status = status;

    // Update task
    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by user',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message,
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Delete task
    const response = await Task.deleteOne({ _id: id, userId });

    // Check if task was deleted
    if (response.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by user',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message,
    });
  }
};

module.exports = { addTask, getAllTasks, updateTask, deleteTask };
