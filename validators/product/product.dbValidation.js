const { checkExists } = require('../../helpers/dbValidation.helper');
const CategoryRepository = require('../../repositories/category.repository');
const BrandRepository = require('../../repositories/brand.repository');
const { validateSubCategoriesInCategory } = require('../subcategory/subcategory.dbValidation');

async function validateProductData(productData, subCategoryIds, categoryId) {
  const targetCategoryId = categoryId || productData.categoryId;

  const [category, brand, subCategories] = await Promise.all([
    checkExists(CategoryRepository, targetCategoryId, 'Category'),
    checkExists(BrandRepository, productData.brandId, 'Brand'),
    validateSubCategoriesInCategory(subCategoryIds, targetCategoryId),
  ]);

  return { category, brand, subCategories };
}

module.exports = {
  validateProductData,
};
