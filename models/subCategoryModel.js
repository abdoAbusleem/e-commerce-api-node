const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const slugify = require("sequelize-slugify");

class SubCategory extends Model {}

SubCategory.init(
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
        msg: "SubCategory must be unique",
      },
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
        model: "categories", 
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "subcategories",
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