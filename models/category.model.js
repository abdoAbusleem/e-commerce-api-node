const { DataTypes, Model } = require('sequelize');
const slugify = require('sequelize-slugify');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init(
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
      unique: true,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  }
);

slugify.slugifyModel(Category, {
  source: ['name'],
  target: 'slug',
  replacement: '-',
  lower: true,
});

module.exports = Category;
