const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const slugify = require('sequelize-slugify');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    priceAfterDiscount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    imageCover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'id',
      },
    },
    ratingsAverage: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: null,
    },
    ratingsQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ['price'] },
      { fields: ['categoryId'] },
      { fields: ['brandId'] },
      { fields: ['ratingsAverage'] },
      { fields: ['createdAt'] },
      { fields: ['slug'] },
      {
        fields: ['title'],
        using: 'gin',
        operator: 'gin_trgm_ops',
      },
    ],
  }
);

slugify.slugifyModel(Product, {
  source: ['title'],
  target: 'slug',
  replacement: '-',
  lower: true,
});

module.exports = Product;
