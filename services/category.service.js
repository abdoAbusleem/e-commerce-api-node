const categoryRepository = require('../repositories/category.repository');
const ApiError = require('../utils/apiError');

class CategoryService {
  async createCategory(data) {
    const { name } = data;
    const category = await categoryRepository.create({ name });
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
    const { name } = data;

    const category = await categoryRepository.findById(id);
    if (!category) throw new ApiError(`No category found for this id: ${id}`, 404);

    const updatedCategory = await categoryRepository.update(id, { name });
    return updatedCategory;
  }

  async deleteCategory(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new ApiError(`No category for this id ${id}`, 404);

    const deletedCategory = await categoryRepository.delete(id);
    return deletedCategory;
  }

  async checkCategoryExists(id) {
    const exists = await categoryRepository.categoryExists(id);
    return exists;
  }
}

module.exports = new CategoryService();
