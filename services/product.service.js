const productRepository = require('../repositories/product.repository');
const sequelize = require('../config/database');
const { validateProductData } = require('../validators/product/product.dbValidation');
const { throwNotFound } = require('../utils/errors');
const ApiError = require('../utils/apiError');

class ProductService {
  async createProduct(data) {
    const { subCategoryIds, ...productData } = data;

    await validateProductData(productData, subCategoryIds);

    const transaction = await sequelize.transaction();
    try {
      const product = await productRepository.create(productData, { transaction });

      if (subCategoryIds?.length > 0) {
        await productRepository.addSubCategories(product.id, subCategoryIds, { transaction });
      }

      const result = await productRepository.findById(product.id, { transaction });
      await transaction.commit();

      return result;
    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      throw error;
    }
  }

  async updateProduct(id, data) {
    const { subCategoryIds, categoryId, ...productData } = data;

    if (categoryId) {
      throw new ApiError(
        'Cannot change category in update, use replaceProductCategory endpoint',
        400
      );
    }

    const product = await productRepository.findById(id);
    if (!product) throw throwNotFound('product', id);

    await validateProductData({
      ...productData,
      categoryId: product.categoryId,
      subCategoryIds,
    });

    const transaction = await sequelize.transaction();
    try {
      const updatedProduct = await productRepository.updateWithRelations(
        id,
        productData,
        subCategoryIds,
        { transaction }
      );

      await transaction.commit();
      return updatedProduct;
    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      throw error;
    }
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw throwNotFound('product', id);
    return product;
  }

  async getAllProducts(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const result = await productRepository.findAll({ page, limit });

    return {
      products: result.rows,
      pagination: {
        total: result.count,
        perPage: limit,
        currentCount: result.rows.length,
        currentPage: page,
      },
    };
  }

  async forceDeleteProduct(id) {
    const exists = await productRepository.exists(id, { paranoid: false });
    if (!exists) throw throwNotFound('product', id);

    await productRepository.forceDelete(id);
    return { message: 'Product permanently deleted successfully' };
  }

  async softDeleteProduct(id) {
    const exists = await productRepository.exists(id);
    if (!exists) throw throwNotFound('product', id);

    await productRepository.softDelete(id);
    return { message: 'Product deleted successfully' };
  }

  async addSubCategoriesToProduct(id, subCategoryIds) {
    const product = await productRepository.findById(id);
    if (!product) throw throwNotFound('product', id);

    const existingSubIds = product.subCategories.map(sub => sub.id);
    const newSubIds = subCategoryIds.filter(subId => !existingSubIds.includes(subId));

    if (newSubIds.length === 0) return product;

    await validateProductData({ categoryId: product.categoryId }, newSubIds);
    await productRepository.addSubCategories(id, newSubIds);

    return this.getProductById(id);
  }

  async replaceProductSubCategories(id, subCategoryIds, categoryId) {
    const exists = await productRepository.exists(id);
    if (!exists) throw throwNotFound('product', id);

    await validateProductData({ categoryId }, subCategoryIds);

    const transaction = await sequelize.transaction();
    try {
      await productRepository.updateWithRelations(id, { categoryId }, { transaction });
      await productRepository.setSubCategories(id, subCategoryIds, { transaction });

      await transaction.commit();
      return this.getProductById(id);
    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new ProductService();
