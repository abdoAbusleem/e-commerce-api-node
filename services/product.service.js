const productRepository = require('../repositories/product.repository');
const { validateProductData } = require('../validators/product/product.dbValidation');
const { ApiError, throwNotFound } = require('../utils');
const { withTransaction } = require('../helpers');
const { MESSAGES, HTTP_STATUS, INCLUDES } = require('../constants');

class ProductService {
  async createProduct(data) {
    const { subCategoryIds, ...productData } = data;

    await validateProductData(productData, subCategoryIds);

    return withTransaction(async transaction => {
      const product = await productRepository.create(productData, { transaction });

      if (subCategoryIds?.length > 0) {
        await productRepository.addSubCategories(product.id, subCategoryIds, { transaction });
      }

      return productRepository.findById(product.id, {
        transaction,
        include: INCLUDES.PRODUCT_INCLUDES.full,
      });
    });
  }

  updateProduct(id, data) {
    const { subCategoryIds, categoryId, ...productData } = data;

    if (categoryId) {
      throw new ApiError(MESSAGES.ERROR.PRODUCT.CANNOT_CHANGE_CATEGORY, HTTP_STATUS.BAD_REQUEST);
    }

    return withTransaction(async transaction => {
      const product = await productRepository.findById(id, { transaction });
      if (!product) throwNotFound('product', id);

      await validateProductData(productData, subCategoryIds, product.categoryId);

      return productRepository.updateWithRelations(id, productData, subCategoryIds, {
        transaction,
        include: INCLUDES.PRODUCT_INCLUDES.full,
      });
    });
  }

  async getProductById(id) {
    const product = await productRepository.findById(id, {
      include: INCLUDES.PRODUCT_INCLUDES.full,
    });
    if (!product) throwNotFound('product', id);
    return product;
  }

  async getAllProducts(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const includeDeleted = queryParams.includeDeleted === 'true';
    const onlyDeleted = queryParams.onlyDeleted === 'true';

    if (includeDeleted && onlyDeleted)
      throw new ApiError(
        MESSAGES.ERROR.REPOSITORY.CANNOT_USE_INCLUDE_AND_ONLY_DELETED,
        HTTP_STATUS.BAD_REQUEST
      );

    const { rows, meta } = await productRepository.findAll({
      page,
      limit,
      includeDeleted,
      onlyDeleted,
      include: INCLUDES.PRODUCT_INCLUDES.full,
    });
    return {
      rows,
      meta,
    };
  }

  async deleteProduct(id, queryParams) {
    const force = queryParams.force === 'true';

    const product = await productRepository.findById(id, { paranoid: !force });
    if (!product) throwNotFound('product', id);

    if (force) {
      await productRepository.forceDelete(id);
    } else {
      await productRepository.delete(id);
    }
  }

  async addSubCategoriesToProduct(id, subCategoryIds) {
    const product = await productRepository.findById(id);
    if (!product) throwNotFound('product', id);

    await validateProductData({ categoryId: product.categoryId }, subCategoryIds);

    return withTransaction(async transaction => {
      await productRepository.addSubCategories(id, subCategoryIds, { transaction });

      return productRepository.findById(id, {
        transaction,
        include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
      });
    });
  }

  async restoreProduct(id) {
    const product = await productRepository.findById(id, { paranoid: false });
    if (!product) throwNotFound('Product', id);

    if (!product.deletedAt) {
      throw new ApiError(MESSAGES.ERROR.PRODUCT.NOT_DELETED, HTTP_STATUS.BAD_REQUEST);
    }

    await productRepository.restore(id);

    return productRepository.findById(id, {
      include: INCLUDES.PRODUCT_INCLUDES.full,
    });
  }
}

module.exports = new ProductService();
