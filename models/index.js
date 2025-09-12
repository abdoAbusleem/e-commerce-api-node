const Category = require('./categoryModel');
const SubCategory = require('./subCategoryModel');
const Brand = require('./brandModel');

Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  as: 'subCategories',
});

SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = { Category, SubCategory, Brand };
