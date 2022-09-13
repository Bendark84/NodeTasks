const express = require('express');

const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const {
  createTaskValidators,
} = require('../middlewares/validators.middlewares');

const taskRoutes = express.Router();

taskRoutes.get('/', getAllTask);

taskRoutes.post('/', createTaskValidators, createTask);

taskRoutes.patch('/:id', updateTask);

taskRoutes.delete('/:id', deleteTask);

module.exports = { taskRoutes };
