const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config');

class ProductSubCategory extends Model {}

ProductSubCategory.init(
  {
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'products', key: 'id' },
      onDelete: 'CASCADE',
    },
    subcategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'subcategories', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'ProductSubCategory',
    tableName: 'ProductSubCategories',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['productId', 'subcategoryId'],
      },
    ],
  }
);

module.exports = ProductSubCategory;
