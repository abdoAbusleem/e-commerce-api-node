const { Product, ProductSubCategory } = require('../models/associations');
const { Op } = require('sequelize');
const BaseRepository = require('./base.repository');
const ApiError = require('../utils/apiError');
const { MESSAGES, HTTP_STATUS } = require('../constants');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  findAll(options = {}) {
    const { includeDeleted = false, onlyDeleted = false } = options;

    if (includeDeleted && onlyDeleted)
      throw new ApiError(
        MESSAGES.ERROR.REPOSITORY.CANNOT_USE_INCLUDE_AND_ONLY_DELETED,
        HTTP_STATUS.BAD_REQUEST
      );

    const finalWhere = { ...(options.where || {}) };
    if (onlyDeleted) finalWhere.deletedAt = { [Op.ne]: null };

    return super.findAll({
      ...options,
      where: finalWhere,
      paranoid: !(includeDeleted || onlyDeleted),
    });
  }

  async updateWithRelations(id, data, subCategoryIds, options = {}) {
    const { transaction } = options;

    await this.Model.update(data, {
      where: { id },
      transaction,
      individualHooks: true,
      hooks: true,
    });

    if (subCategoryIds !== undefined) {
      await this.setSubCategories(id, subCategoryIds, { transaction });
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

  async setSubCategories(productId, subCategoryIds, options = {}) {
    const { transaction } = options;
    const queryOptions = transaction ? { transaction } : {};

    const existing = await ProductSubCategory.findAll({
      where: { productId },
      attributes: ['subcategoryId'],
      ...queryOptions,
    });

    const existingIds = existing.map(item => item.subcategoryId);

    const toRemove = existingIds.filter(id => !subCategoryIds.includes(id));
    const toAdd = subCategoryIds.filter(id => !existingIds.includes(id));

    if (toRemove.length > 0) {
      await ProductSubCategory.destroy({
        where: { productId, subcategoryId: toRemove },
        ...queryOptions,
      });
    }

    if (toAdd.length > 0) {
      const relationships = toAdd.map(subcategoryId => ({ productId, subcategoryId }));
      await ProductSubCategory.bulkCreate(relationships, queryOptions);
    }
  }
}

module.exports = new ProductRepository();
