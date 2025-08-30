const sequelize = require("../config/database")
const { DataTypes, Model } = require("sequelize")
const { v4: uuidv4 } = require('uuid');
const slugify = require("sequelize-slugify");




class Category extends Model { }


Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: {
        msg: 'Category name already exists',
      },
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
    tableName: "categories",
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