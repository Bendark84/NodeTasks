const express = require('express');

const { usersRoutes } = require('./routes/user.routes');
const { taskRoutes } = require('./routes/task.routes');

const app = express();

app.use(express.json());

//Endpoints

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/tasks', taskRoutes);

module.exports = { app };
