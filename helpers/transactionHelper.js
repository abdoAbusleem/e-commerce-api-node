// helpers/transactionHelper.js
const sequelize = require('../config/database');

async function withTransaction(callback) {
  const transaction = await sequelize.transaction();
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
    throw error;
  }
}

module.exports = withTransaction;
