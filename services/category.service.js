const categoryRepository = require('../repositories/category.repository');
const ApiError = require('../utils/apiError');

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
    if (!category) throw new ApiError(`No category found for this id ${id}`, 404);

    return category;
  }

  async updateCategory(id, data) {
    const category = await categoryRepository.exists(id);
    if (!category) throw new ApiError(`No category found for this id: ${id}`, 404);

    await categoryRepository.update(id, data);
    return categoryRepository.findById(id);
  }

  async deleteCategory(id) {
    const category = await categoryRepository.exists(id);
    if (!category) throw new ApiError(`No category found for this id ${id}`, 404);

    await categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }
}

module.exports = new CategoryService();
