const ApiError = require('../../utils/apiError');
const SubCategoryRepository = require('../../repositories/subcategory.repository');
const { checkExists } = require('../../helpers/dbValidation.helper');
const CategoryRepository = require('../../repositories/category.repository');
const { MESSAGES, HTTP_STATUS } = require('../../constants');

async function validateSubCategoriesInCategory(subCategoryIds, categoryId) {
  if (!subCategoryIds?.length) return [];

  const { rows } = await SubCategoryRepository.findAll({
    where: { id: subCategoryIds, categoryId },
  });

  if (rows.length !== subCategoryIds.length) {
    throw new ApiError(MESSAGES.ERROR.SUBCATEGORY.INVALID_RELATION, HTTP_STATUS.BAD_REQUEST);
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
