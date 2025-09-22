const subCategoryRepository = require('../repositories/subcategory.repository');
const ApiError = require('../utils/apiError');

class SubCategoryService {
  async createSubCategory(data) {
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
    if (!subCategory) {
      throw new ApiError(`No subcategory found for this id ${id}`, 404);
    }
    return subCategory;
  }

  async updateSubCategory(id, data) {
    const subCategory = await subCategoryRepository.exists(id);
    if (!subCategory) {
      throw new ApiError(`No subcategory found for this id: ${id}`, 404);
    }

    await subCategoryRepository.update(id, data);
    return subCategoryRepository.findById(id);
  }

  async deleteSubCategory(id) {
    const subCategory = await subCategoryRepository.exists(id);
    if (!subCategory) {
      throw new ApiError(`No subcategory found for this id ${id}`, 404);
    }

    await subCategoryRepository.delete(id);
    return { message: 'Subcategory deleted successfully' };
  }
}

module.exports = new SubCategoryService();
