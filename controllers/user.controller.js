const bcrypt = require('bcryptjs');

const { User } = require('../models/users.model');
const { Task } = require('../models/tasks.model');
const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ['id', 'name'], //Para mostrar solo las columnas que indique
      include: [
        {
          model: Task,
          attributes: ['id', 'title', 'limitDate', 'startDate', 'finishDate'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const getActiveUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { status: 'active' } });
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    //Remove pass from responce
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'cancelled' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  getActiveUser,
  createUser,
  updateUser,
  deleteUser,
};
