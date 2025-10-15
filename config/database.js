const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  pool: {
    max: 50,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  logging: msg => {
    if (msg.startsWith('Executing')) return;
    console.log(`[DB] ${msg}`);
  },
});

sequelize.sync();

module.exports = sequelize;
