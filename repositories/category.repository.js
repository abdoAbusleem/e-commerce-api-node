const { Category } = require('../models/associations');

class CategoryRepository {
  create(data, options = {}) {
    return Category.create(data, options);
  }

  findAll(options = {}) {
    const { page = 1, limit = 5, order = [['createdAt', 'DESC']], where = {} } = options;
    const offset = (page - 1) * limit;

    return Category.findAndCountAll({
      where,
      order,
      limit,
      offset,
      ...options,
    });
  }

  findById(id, options = {}) {
    return Category.findByPk(id, options);
  }

  update(id, data, options = {}) {
    return Category.update(data, { where: { id }, ...options });
  }

  delete(id, options = {}) {
    return Category.destroy({ where: { id }, ...options });
  }

  async exists(id, options = {}) {
    const count = await Category.count({ where: { id }, ...options });
    return count > 0;
  }
}

module.exports = new CategoryRepository();
