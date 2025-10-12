const productRepository = require('../repositories/product.repository');
const { validateProductData } = require('../validators/product/product.dbValidation');
const { throwNotFound } = require('../utils/errors');
const ApiError = require('../utils/apiError');
const withTransaction = require('../helpers/transactionHelper');
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
        include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
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
        include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
      });
    });
  }

  async getProductById(id) {
    const product = await productRepository.findById(id, {
      include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
    });
    if (!product) throwNotFound('product', id);
    return product;
  }

  async getAllProducts(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const includeDeleted = queryParams.includeDeleted === 'true';
    const onlyDeleted = queryParams.onlyDeleted === 'true';

    const { rows, meta } = await productRepository.findAll({
      page,
      limit,
      includeDeleted,
      onlyDeleted,
      include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
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
    await productRepository.addSubCategories(id, subCategoryIds);

    return productRepository.findById(id, {
      include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
    });
  }

  async restoreProduct(id) {
    const product = await productRepository.findById(id, {
      paranoid: false,
      include: INCLUDES.PRODUCT_INCLUDES.withSubCategories,
    });

    if (!product) throwNotFound('product', id);

    if (!product.deletedAt) {
      throw new ApiError(MESSAGES.ERROR.PRODUCT.NOT_DELETED, HTTP_STATUS.BAD_REQUEST);
    }

    await product.restore();
    return product;
  }
}

module.exports = new ProductService();
