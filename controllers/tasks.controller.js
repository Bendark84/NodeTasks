const { Task } = require('../models/tasks.model');
const { User } = require('../models/users.model.js');

const getAllTask = async (req, res) => {
  try {
    const task = await Task.findAll({
      attributes: ['id', 'title', 'limitDate', 'startDate', 'finishDate'],
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { userId, title, startDate, limitDate } = req.body;

    const newTask = await Task.create({
      userId,
      title,
      startDate,
      limitDate,
    });

    res.status(201).json({
      status: 'success',
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    await task.update({ finishDate });
    if (task.limitDate >= task.finishDate) {
      await task.update({ status: 'completed' });
    } else if (task.limitDate < task.finishDate) {
      await task.update({ status: 'late' });
    }

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: 'cancelled' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
};
