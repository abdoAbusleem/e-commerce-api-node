const Category = require('./category.model');
const SubCategory = require('./subcategory.model');
const Brand = require('./brand.model');
const Product = require('./product.model');

// 🔹 Category ↔ SubCategory
Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  as: 'subCategories',
  onDelete: 'CASCADE', // لو الكاتيجوري اتمسح → السابكاتيجوريز تتشال
  onUpdate: 'CASCADE',
});

SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// 🔹 Category ↔ Product
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
  onDelete: 'RESTRICT', // ⛔ ميمنعش مسح كاتيجوري لو فيه منتجات مرتبطة بيه
  onUpdate: 'CASCADE',
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

// 🔹 SubCategory ↔ Product
SubCategory.hasMany(Product, {
  foreignKey: 'subcategoryId',
  as: 'products',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Product.belongsTo(SubCategory, {
  foreignKey: 'subcategoryId',
  as: 'subcategory',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// 🔹 Brand ↔ Product
Brand.hasMany(Product, {
  foreignKey: 'brandId',
  as: 'products',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Product.belongsTo(Brand, {
  foreignKey: 'brandId',
  as: 'brand',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

module.exports = { Category, SubCategory, Brand, Product };
