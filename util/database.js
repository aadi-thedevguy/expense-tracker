const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: { // <1>
      rejectUnauthorized: true,
    }
  },
});

module.exports = sequelize;
