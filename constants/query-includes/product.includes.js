const { SubCategory, Category, Brand } = require('../../models/associations');

const PRODUCT_INCLUDES = {
  basic: [{ model: Category, as: 'category' }],

  withSubCategories: [
    { model: SubCategory, as: 'subCategories', through: { attributes: [] } },
    { model: Category, as: 'category' },
  ],

  full: [
    {
      model: SubCategory,
      as: 'subCategories',
      through: { attributes: [] },
      required: false,
    },
    { model: Category, as: 'category' },
    { model: Brand, as: 'brand' },
  ],

  subCategoriesOnly: [{ model: SubCategory, as: 'subCategories', through: { attributes: [] } }],
};

module.exports = PRODUCT_INCLUDES;
