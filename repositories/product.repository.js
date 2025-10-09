const { Product, SubCategory, Category, ProductSubCategory } = require('../models/associations');
const { Op } = require('sequelize');
const BaseRepository = require('./base.repository');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  findAll(options = {}) {
    const { includeDeleted = false, onlyDeleted = false } = options;

    const finalWhere = { ...(options.where || {}) };
    if (onlyDeleted) finalWhere.deletedAt = { [Op.ne]: null };

    return super.findAll({
      ...options,
      where: finalWhere,
      paranoid: !(includeDeleted || onlyDeleted),
      include: [
        { model: SubCategory, as: 'subCategories', through: { attributes: [] } },
        { model: Category, as: 'category' },
      ],
    });
  }

  async updateWithRelations(id, data, subCategoryIds, options = {}) {
    await this.Model.update(data, { where: { id }, ...options });
    if (subCategoryIds !== undefined) {
      await this.setSubCategories(id, subCategoryIds, options);
    }
    return this.findById(id, options);
  }

  forceDelete(id) {
    return this.Model.destroy({ where: { id }, force: true, paranoid: false });
  }

  softDelete(id) {
    return this.Model.destroy({ where: { id } });
  }

  restore(id) {
    return this.Model.restore({ where: { id } });
  }

  addSubCategories(productId, subCategoryIds, options = {}) {
    const relationships = subCategoryIds.map(subcategoryId => ({ productId, subcategoryId }));
    return ProductSubCategory.bulkCreate(relationships, { ignoreDuplicates: true, ...options });
  }

  removeAllSubCategories(productId, options = {}) {
    return ProductSubCategory.destroy({ where: { productId }, ...options });
  }

  async setSubCategories(productId, subCategoryIds, options = {}) {
    await this.removeAllSubCategories(productId, options);
    if (subCategoryIds?.length > 0) {
      await this.addSubCategories(productId, subCategoryIds, options);
    }
  }
}

module.exports = new ProductRepository();
