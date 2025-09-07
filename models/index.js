const Category = require('./categoryModel');
const SubCategory = require('./subCategoryModel');
const Brand = require('./brandModel');


// تعريف العلاقات بين الموديلات
Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  as: 'subCategories',
});

SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

// تصدير الموديلات مع العلاقات
module.exports = { Category, SubCategory, Brand };
