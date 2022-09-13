const express = require('express');
const { body, validationResult } = require('express-validator');

const {
  getAllUser,
  getActiveUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const { userExists } = require('../middlewares/oneUser.middlewares');
const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUser);

usersRoutes.get('/:id', userExists, getActiveUser);

usersRoutes.post('/', createUserValidators, createUser);

usersRoutes.patch('/:id', userExists, updateUser);

usersRoutes.delete('/:id', userExists, deleteUser);

module.exports = { usersRoutes };
