const { Product, Category, SubCategory, Brand } = require('../models/associations');

const getCategoryIdToUse = async (data, productId = null) => {
  if (data.categoryId) return data.categoryId;

  if (productId) {
    const product = await Product.findByPk(productId);
    return product ? product.categoryId : null;
  }

  return null;
};

const validateCategory = async categoryId => {
  if (!categoryId) return null;

  const category = await Category.findByPk(categoryId);
  return category
    ? null
    : { field: 'categoryId', message: `No category found for id: ${categoryId}` };
};

const validateSubCategories = async (subCategoryIds, categoryId) => {
  if (!subCategoryIds?.length) return null;

  const subCategories = await SubCategory.findAll({
    where: { id: subCategoryIds, categoryId },
  });

  return subCategories.length === subCategoryIds.length
    ? null
    : {
        field: 'subCategoryIds',
        message: 'Some subCategories do not belong to the product category',
      };
};

const validateBrand = async brandId => {
  if (!brandId) return null;

  const brand = await Brand.findByPk(brandId);
  return brand ? null : { field: 'brandId', message: `No brand found for this id: ${brandId}` };
};

const validateEntityExists = (Model, fieldName) => {
  return async id => {
    if (!id) return true;
    const count = await Model.count({ where: { id } });
    if (count === 0) {
      throw new Error(`No ${fieldName} found for this id: ${id}`);
    }
    return true;
  };
};

module.exports = {
  getCategoryIdToUse,
  validateCategory,
  validateSubCategories,
  validateBrand,
  validateEntityExists,
};
