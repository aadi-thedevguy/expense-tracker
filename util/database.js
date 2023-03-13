const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: { // <1>
//       rejectUnauthorized: true,
//     }
//   },
// });

const sequelize = new Sequelize('expensetracker', 'root', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
