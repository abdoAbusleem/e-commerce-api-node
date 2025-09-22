const Category = require('./category.model');
const SubCategory = require('./subcategory.model');
const Brand = require('./brand.model');
const Product = require('./product.model');
const ProductSubCategory = require('./productsubcategory.model'); // الجديد

Category.hasMany(SubCategory, {
  foreignKey: 'categoryId',
  as: 'subCategories',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

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

Product.belongsToMany(SubCategory, {
  through: ProductSubCategory,
  as: 'subCategories',
  foreignKey: 'productId',
  otherKey: 'subcategoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

SubCategory.belongsToMany(Product, {
  through: ProductSubCategory,
  as: 'products',
  foreignKey: 'subcategoryId',
  otherKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = { Category, SubCategory, Brand, Product, ProductSubCategory };
