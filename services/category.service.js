const CategoryRepository = require('../repositories/category.repository');
const { throwNotFound } = require('../utils');
const { validateCategoryData } = require('../validators/category/category.dbValidation');

class CategoryService {
  async createCategory(data) {
    await validateCategoryData(data.name);
    const category = await CategoryRepository.create(data);
    return category;
  }

  async getAllCategories(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const { rows, meta } = await CategoryRepository.findAll({
      page,
      limit,
    });
    return {
      rows,
      meta,
    };
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) throwNotFound('category', id);
    return category;
  }

  async updateCategory(id, data) {
    const category = await CategoryRepository.findById(id);
    if (!category) throwNotFound('category', id);

    await validateCategoryData(data.name, id);

    const updatedCategory = await CategoryRepository.update(id, data);
    return updatedCategory;
  }

  async deleteCategory(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) throwNotFound('category', id);

    await CategoryRepository.delete(id);
  }
}

module.exports = new CategoryService();
