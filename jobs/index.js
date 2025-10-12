const softDeleteCleanup = require('./softDeleteCleanup');

module.exports = function initJobs() {
  softDeleteCleanup();
};
