const asyncHandler = require('express-async-handler');
const productService = require('../services/product.service');
const { successResponse } = require('../utils/responseFormatter');
const { MESSAGES, HTTP_STATUS } = require('../constants');
// @desc    Create Product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  return successResponse(res, {
    data: product,
    message: MESSAGES.SUCCESS.PRODUCT.CREATED,
    statusCode: HTTP_STATUS.CREATED,
  });
});

// @desc    Get list of Products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  // const isAdmin = req.user?.role === 'admin';

  // const query = { ...req.query };

  // if (!isAdmin) {
  //   delete query.includeDeleted;
  //   delete query.onlyDeleted;
  // }

  const result = await productService.getAllProducts(req.query);

  return successResponse(res, {
    data: result.rows,
    message: MESSAGES.SUCCESS.PRODUCT.LISTED,
    meta: result.meta,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Get specific Product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return successResponse(res, {
    data: product,
    message: MESSAGES.SUCCESS.PRODUCT.FETCHED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Update specific Product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  return successResponse(res, {
    data: product,
    message: MESSAGES.SUCCESS.PRODUCT.UPDATED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Delete specific Product (soft or force based on query param)
// @route   DELETE /api/v1/products/:id?force=true
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.query);

  if (req.query.force === 'true') {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  return successResponse(res, {
    message: MESSAGES.SUCCESS.PRODUCT.DELETED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Add subcategories to a product
// @route   POST /api/v1/products/:id/subcategories
// @access  Private
exports.addSubCategoriesToProduct = asyncHandler(async (req, res) => {
  const product = await productService.addSubCategoriesToProduct(
    req.params.id,
    req.body.subCategoryIds
  );

  return successResponse(res, {
    data: product,
    message: MESSAGES.SUCCESS.PRODUCT.SUBCATEGORIES_ADDED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Restore specific Product
// @route   POST /api/v1/products/:id/restore
// @access  Private
exports.restoreProduct = asyncHandler(async (req, res) => {
  const product = await productService.restoreProduct(req.params.id);

  return successResponse(res, {
    data: product,
    message: MESSAGES.SUCCESS.PRODUCT.RESTORED,
    statusCode: HTTP_STATUS.OK,
  });
});
