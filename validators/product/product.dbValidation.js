const { checkExists } = require('../../helpers');
const CategoryRepository = require('../../repositories/category.repository');
const BrandRepository = require('../../repositories/brand.repository');
const { validateSubCategoriesInCategory } = require('../shared/entity-validators');

async function validateProductData(productData, subCategoryIds, categoryId) {
  const resolveCategoryId = categoryId || productData.categoryId;

  const validations = [
    resolveCategoryId && checkExists(CategoryRepository, resolveCategoryId, 'category'),

    productData.brandId && checkExists(BrandRepository, productData.brandId, 'brand'),

    subCategoryIds?.length > 0 &&
      validateSubCategoriesInCategory(subCategoryIds, resolveCategoryId),
  ].filter(Boolean);

  await Promise.all(validations);
}

module.exports = {
  validateProductData,
};
