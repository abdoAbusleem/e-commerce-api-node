const { checkManyExists } = require('../../helpers');
const SubCategoryRepository = require('../../repositories/subcategory.repository');
const { MESSAGES, HTTP_STATUS } = require('../../constants');
const { ApiError } = require('../../utils');

async function validateSubCategoriesInCategory(subCategoryIds, categoryId) {
  if (!subCategoryIds?.length) return [];

  const subCategories = await checkManyExists(SubCategoryRepository, subCategoryIds, 'SubCategory');

  const invalidRelation = subCategories.some(sc => sc.categoryId !== categoryId);

  if (invalidRelation) {
    throw new ApiError(MESSAGES.ERROR.SUBCATEGORY.INVALID_RELATION, HTTP_STATUS.BAD_REQUEST);
  }

  return subCategories;
}

module.exports = {
  validateSubCategoriesInCategory,
};
