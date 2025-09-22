const { SubCategory } = require('../models/associations');

class SubCategoryRepository {
  create(data, options = {}) {
    return SubCategory.create(data, options);
  }

  findAll(options = {}) {
    const { page = 1, limit = 5, where = {}, order = [['createdAt', 'DESC']] } = options;
    const offset = (page - 1) * limit;

    return SubCategory.findAndCountAll({
      where,
      order,
      limit,
      offset,
      ...options,
    });
  }

  findById(id, options = {}) {
    return SubCategory.findByPk(id, options);
  }

  update(id, data, options = {}) {
    return SubCategory.update(data, { where: { id }, ...options });
  }

  delete(id, options = {}) {
    return SubCategory.destroy({ where: { id }, ...options });
  }

  async exists(id, options = {}) {
    const count = await SubCategory.count({ where: { id }, ...options });
    return count > 0;
  }
}

module.exports = new SubCategoryRepository();
