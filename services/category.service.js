const categoryRepository = require('../repositories/category.repository');
const { throwNotFound } = require('../utils/errors');
class CategoryService {
  async createCategory(data) {
    const category = await categoryRepository.create(data);
    return category;
  }

  async getAllCategories(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const result = await categoryRepository.findAll({ page, limit });

    return {
      categories: result.rows,
      pagination: {
        total: result.count,
        perPage: limit,
        currentCount: result.rows.length,
        currentPage: page,
      },
    };
  }

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw throwNotFound('category', id);

    return category;
  }

  async updateCategory(id, data) {
    const exists = await categoryRepository.exists(id);
    if (!exists) throw throwNotFound('category', id);

    await categoryRepository.update(id, data);
    return categoryRepository.findById(id);
  }

  async deleteCategory(id) {
    const exists = await categoryRepository.exists(id);
    if (!exists) throw throwNotFound('category', id);

    await categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }
}

module.exports = new CategoryService();
