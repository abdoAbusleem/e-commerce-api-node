const { checkUniqueName } = require('../../helpers');
const BrandRepository = require('../../repositories/brand.repository');

async function validateBrandData(name, excludeId = null) {
  await checkUniqueName(BrandRepository, name, 'brand', excludeId);
}

module.exports = {
  validateBrandData,
};
