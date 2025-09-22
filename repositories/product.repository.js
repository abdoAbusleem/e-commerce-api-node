const { Product, SubCategory, Category, ProductSubCategory } = require('../models/associations');

class ProductRepository {
  create(data, options = {}) {
    return Product.create(data, options);
  }

  findAll(options = {}) {
    const { page = 1, limit = 5, order = [['createdAt', 'DESC']], where = {} } = options;
    const offset = (page - 1) * limit;

    return Product.findAndCountAll({
      where,
      order,
      limit,
      offset,
      ...options,
      include: [
        { model: SubCategory, as: 'subCategories', through: { attributes: [] } },
        { model: Category, as: 'category' },
      ],
    });
  }

  findById(id, options = {}) {
    return Product.findByPk(id, {
      ...options,
      include: [
        { model: SubCategory, as: 'subCategories', through: { attributes: [] } },
        { model: Category, as: 'category' },
      ],
    });
  }

  update(id, data, options = {}) {
    return Product.update(data, { where: { id }, ...options });
  }

  forceDelete(id) {
    return Product.destroy({ where: { id }, force: true, paranoid: false });
  }

  softDelete(id) {
    return Product.destroy({ where: { id } });
  }

  async productExists(id, options = {}) {
    const count = await Product.count({ where: { id }, ...options });
    return count > 0;
  }

  addSubCategories(productId, subCategoryIds, options = {}) {
    const relationships = subCategoryIds.map(subcategoryId => ({ productId, subcategoryId }));
    console.log('relationships', relationships);
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
