const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const slugify = require('sequelize-slugify');
const sequelize = require('../config/database');

class Brand extends Model {}

Brand.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'brands',
    timestamps: true,
  }
);

// Generate slug from name
slugify.slugifyModel(Brand, {
  source: ['name'],
  target: 'slug',
  replacement: '-',
  lower: true,
});

module.exports = Brand;
