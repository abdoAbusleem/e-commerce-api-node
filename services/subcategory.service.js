const subCategoryRepository = require('../repositories/subcategory.repository');
const { throwNotFound } = require('../utils/errors');
const { validateCategoryExists } = require('../validators/subcategory/subcategory.dbValidation');

class SubCategoryService {
  async createSubCategory(data) {
    await validateCategoryExists(data.categoryId);
    const subCategory = await subCategoryRepository.create(data);
    return subCategory;
  }

  async getAllSubCategories(queryParams, categoryId) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const where = categoryId ? { categoryId } : {};

    const result = await subCategoryRepository.findAll({ page, limit, where });

    return {
      subCategories: result.rows,
      pagination: {
        total: result.count,
        perPage: limit,
        currentCount: result.rows.length,
        currentPage: page,
      },
    };
  }

  async getSubCategoryById(id) {
    const subCategory = await subCategoryRepository.findById(id);
    if (!subCategory) throw throwNotFound('subcategory', id);

    return subCategory;
  }

  async updateSubCategory(id, data) {
    const exists = await subCategoryRepository.exists(id);
    if (!exists) throw throwNotFound('subcategory', id);

    await subCategoryRepository.update(id, data);
    return subCategoryRepository.findById(id);
  }

  async deleteSubCategory(id) {
    const exists = await subCategoryRepository.exists(id);
    if (!exists) throw throwNotFound('subcategory', id);

    await subCategoryRepository.delete(id);
    return { message: 'Subcategory deleted successfully' };
  }
}

module.exports = new SubCategoryService();
