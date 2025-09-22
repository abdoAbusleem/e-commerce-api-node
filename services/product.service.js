const productRepository = require('../repositories/product.repository');
const ApiError = require('../utils/apiError');
const sequelize = require('../config/database');

class ProductService {
  async createProduct(data) {
    const transaction = await sequelize.transaction();

    try {
      const { subCategoryIds, ...productData } = data;

      const product = await productRepository.create(productData, { transaction });

      if (subCategoryIds?.length > 0) {
        await productRepository.addSubCategories(product.id, subCategoryIds, { transaction });
      }

      const result = await productRepository.findById(product.id, { transaction });

      await transaction.commit();
      return result;
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async updateProduct(id, data) {
    const transaction = await sequelize.transaction();

    try {
      const { subCategoryIds, ...productData } = data;

      const product = await productRepository.findById(id);
      if (!product) {
        throw new ApiError(`No product found for this id: ${id}`, 404);
      }

      if (Object.keys(productData).length > 0) {
        await productRepository.update(id, productData, { transaction });
      }

      if (subCategoryIds !== undefined) {
        await productRepository.setSubCategories(id, subCategoryIds, { transaction });
      }

      const result = await productRepository.findById(id, { transaction });

      await transaction.commit();
      return result;
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback();
      }
      throw error;
    }
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new ApiError(`No product for this id ${id}`, 404);
    }
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
    const product = await productRepository.productExists(id, { paranoid: false });
    if (!product) {
      throw new ApiError(`No product for this id ${id}`, 404);
    }

    await productRepository.forceDelete(id);
    return { message: 'Product deleted successfully' };
  }

  async softDeleteProduct(id) {
    const product = await productRepository.productExists(id);
    if (!product) {
      throw new ApiError(`No product for this id ${id}`, 404);
    }

    await productRepository.softDelete(id);
    return { message: 'Product deleted successfully' };
  }

  async addSubCategoriesToProduct(id, subCategoryIds) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new ApiError(`No product for this id ${id}`, 404);
    }

    await productRepository.addSubCategories(id, subCategoryIds);
    return this.getProductById(id);
  }

  async replaceProductSubCategories(id, subCategoryIds) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new ApiError(`No product for this id ${id}`, 404);
    }

    await productRepository.setSubCategories(id, subCategoryIds);
    return this.getProductById(id);
  }
}

module.exports = new ProductService();
