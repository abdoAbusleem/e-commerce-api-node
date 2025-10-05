const ApiError = require('../../utils/apiError');
const SubCategoryRepository = require('../../repositories/subcategory.repository');
const { checkExists } = require('../../helpers/dbValidation.helper');
const CategoryRepository = require('../../repositories/category.repository');

async function validateSubCategoriesInCategory(subCategoryIds, categoryId) {
  if (!subCategoryIds?.length) return;
  const validSubCategories = await SubCategoryRepository.findAll({
    where: { id: subCategoryIds, categoryId },
  });
  if (validSubCategories.length !== subCategoryIds.length) {
    throw new ApiError('Some subcategories do not belong to the provided category', 400);
  }
  return validSubCategories;
}

async function validateCategoryExists(categoryId) {
  await checkExists(CategoryRepository, categoryId);
}

module.exports = {
  validateSubCategoriesInCategory,
  validateCategoryExists,
};
