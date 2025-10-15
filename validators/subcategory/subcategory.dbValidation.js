const { checkUniqueName } = require('../../helpers');
const SubCategoryRepository = require('../../repositories/subcategory.repository');
const { checkExists } = require('../../helpers');
const CategoryRepository = require('../../repositories/category.repository');

async function validateSubCategoryData(subCategoryData, excludeId = null) {
  const { name, categoryId } = subCategoryData;

  const validations = [
    name &&
      categoryId &&
      checkUniqueName(SubCategoryRepository, name, 'subcategory', excludeId, { categoryId }),

    categoryId && checkExists(CategoryRepository, categoryId, 'category'),
  ].filter(Boolean);

  await Promise.all(validations);
}

module.exports = {
  validateSubCategoryData,
};
