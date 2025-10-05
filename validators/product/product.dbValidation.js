const { checkExists } = require('../../helpers/dbValidation.helper');
const CategoryRepository = require('../../repositories/category.repository');
const BrandRepository = require('../../repositories/brand.repository');
const { validateSubCategoriesInCategory } = require('../subcategory/subcategory.dbValidation');

async function validateProductData(productData, subCategoryIds) {
  const [category, brand] = await Promise.all([
    checkExists(CategoryRepository, productData.categoryId, 'Category'),
    checkExists(BrandRepository, productData.brandId, 'Brand'),
    validateSubCategoriesInCategory(subCategoryIds, productData.categoryId),
  ]);

  return { category, brand };
}

module.exports = {
  validateProductData,
};
