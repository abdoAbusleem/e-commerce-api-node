const { checkUniqueName } = require('../../helpers');
const CategoryRepository = require('../../repositories/category.repository');

async function validateCategoryData(name, excludeId = null) {
  await checkUniqueName(CategoryRepository, name, 'category', excludeId);
}

module.exports = {
  validateCategoryData,
};
