const { User } = require('./users.model');
const { Task } = require('./tasks.model');

//Establish models relations--------  de uno a muchos

const initModels = () => {
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User);
};

module.exports = { initModels };
