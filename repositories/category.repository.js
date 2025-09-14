const { Category } = require('../models/associations');

class CategoryRepository {
  async create(data) {
    const category = await Category.create(data);
    return category;
  }

  async findAll(options = {}) {
    const { page = 1, limit = 5, order = [['createdAt', 'DESC']] } = options;
    const offset = (page - 1) * limit;

    const result = await Category.findAndCountAll({
      order,
      limit,
      offset,
    });
    return result;
  }

  async findById(id) {
    const category = await Category.findByPk(id);
    return category;
  }

  async update(id, data) {
    const category = await this.findById(id);
    if (!category) return null;

    await category.update(data);
    return category;
  }

  async delete(id) {
    const category = await this.findById(id);
    if (!category) return null;

    await category.destroy();
    return category;
  }

  async categoryExists(id) {
    const category = await Category.findByPk(id);
    return !!category;
  }
}

module.exports = new CategoryRepository();
