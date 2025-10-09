const SubCategoryRepository = require('../repositories/subcategory.repository');
const { throwNotFound } = require('../utils/errors');
const { validateCategoryExists } = require('../validators/subcategory/subcategory.dbValidation');

class SubCategoryService {
  async createSubCategory(data) {
    await validateCategoryExists(data.categoryId);
    const subCategory = await SubCategoryRepository.create(data);
    return subCategory;
  }

  async getAllSubCategories(queryParams, categoryId) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const where = categoryId ? { categoryId } : {};
    const { rows, meta } = await SubCategoryRepository.findAll({
      page,
      limit,
      where,
    });
    return {
      rows,
      meta,
    };
  }

  async getSubCategoryById(id) {
    const subCategory = await SubCategoryRepository.findById(id);
    if (!subCategory) throwNotFound('subcategory', id);
    return subCategory;
  }

  async updateSubCategory(id, data) {
    const exists = await SubCategoryRepository.exists(id);
    if (!exists) throwNotFound('subcategory', id);

    await validateCategoryExists(data.categoryId);
    const subCategory = await SubCategoryRepository.update(id, data);
    return subCategory;
  }

  async deleteSubCategory(id) {
    const exists = await SubCategoryRepository.exists(id);
    if (!exists) throwNotFound('subcategory', id);

    await SubCategoryRepository.delete(id);
  }
}

module.exports = new SubCategoryService();
