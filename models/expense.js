const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User = require('./user');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,

    references: {
      model: User,
      // This is the column name of the referenced model
      key: 'id',
    }
  },
});

module.exports = Expense;
