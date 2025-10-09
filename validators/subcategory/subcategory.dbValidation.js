const ApiError = require('../../utils/apiError');
const SubCategoryRepository = require('../../repositories/subcategory.repository');
const { checkExists } = require('../../helpers/dbValidation.helper');
const CategoryRepository = require('../../repositories/category.repository');

async function validateSubCategoriesInCategory(subCategoryIds, categoryId) {
  if (!subCategoryIds?.length) return [];

  const { rows } = await SubCategoryRepository.findAll({
    where: { id: subCategoryIds, categoryId },
  });

  if (rows.length !== subCategoryIds.length) {
    // ✅ استخدم rows.length
    throw new ApiError('Some subcategories do not belong to the provided category', 400);
  }

  return rows;
}

async function validateCategoryExists(categoryId) {
  await checkExists(CategoryRepository, categoryId, 'category');
}

module.exports = {
  validateSubCategoriesInCategory,
  validateCategoryExists,
};
