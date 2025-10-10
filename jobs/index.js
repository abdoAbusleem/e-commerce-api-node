const autoDeleteSoftDeletedProducts = require('./autoDeleteSoftDeletedProducts');

module.exports = function initJobs() {
  autoDeleteSoftDeletedProducts();
};
