const { SubCategory } = require('../models/associations');

class SubCategoryRepository {
  async create(data) {
    const subCategory = await SubCategory.create(data); // عرفنا متغير
    return subCategory; // رجعناه
  }

  async findAll(options = {}) {
    const { page = 1, limit = 5, filter = {}, order = [['createdAt', 'DESC']] } = options;
    const offset = (page - 1) * limit;

    const result = await SubCategory.findAndCountAll({
      where: filter,
      order,
      limit,
      offset,
    });
    return result;
  }

  async findById(id) {
    const subCategory = await SubCategory.findByPk(id);
    return subCategory;
  }

  async update(subCategory, data) {
    const updated = await subCategory.update(data);
    return updated;
  }

  async delete(subCategory) {
    const deleted = await subCategory.destroy();
    return deleted;
  }
}

module.exports = new SubCategoryRepository();
