const softDeleteCleanup = require('./cleanup-soft-deleted');

module.exports = function initJobs() {
  softDeleteCleanup();
};
