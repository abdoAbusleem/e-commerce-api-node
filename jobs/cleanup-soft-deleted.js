const schedule = require('node-schedule');
const { Product } = require('../models/associations');
const { Op } = require('sequelize');

function softDeleteCleanup() {
  if (process.env.ENABLE_CLEANUP_JOB !== 'true') return;

  const scheduleTime = process.env.CLEANUP_SCHEDULE || '0 6 * * *';
  const retentionDays = Number(process.env.SOFT_DELETE_RETENTION_DAYS || 30);

  schedule.scheduleJob(scheduleTime, async () => {
    try {
      const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

      const deletedCount = await Product.destroy({
        where: {
          deletedAt: { [Op.ne]: null, [Op.lt]: cutoffDate },
        },
        force: true,
        paranoid: false,
      });

      console.log(`Deleted ${deletedCount} old products`);
    } catch (error) {
      console.error(' Cleanup failed:', error.message);
    }
  });
}

module.exports = softDeleteCleanup;
