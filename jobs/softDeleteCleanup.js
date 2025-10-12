const schedule = require('node-schedule');
const { Product } = require('../models/associations');
const { Op } = require('sequelize');

function autoDeleteSoftDeletedProducts() {
  schedule.scheduleJob('/2 * * *', async () => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const deletedCount = await Product.destroy({
        where: {
          deletedAt: { [Op.ne]: null, [Op.lt]: thirtyDaysAgo },
        },
        force: true,
        paranoid: false,
      });

      console.log(`Deleted ${deletedCount} products`);
    } catch (error) {
      console.error(' Cleanup failed:', error.message);
    }
  });
}

module.exports = autoDeleteSoftDeletedProducts;
