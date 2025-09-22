const { DataTypes, Model } = require('sequelize');
const slugify = require('sequelize-slugify');
const sequelize = require('../config/database');

class SubCategory extends Model {}

SubCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'subcategories',
    timestamps: true,
  }
);

slugify.slugifyModel(SubCategory, {
  source: ['name'],
  target: 'slug',
  replacement: '-',
  lower: true,
});

module.exports = SubCategory;
