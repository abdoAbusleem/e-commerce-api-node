// controllers/category.controller.js
const asyncHandler = require('express-async-handler');
const productService = require('../services/product.service');
const { successResponse } = require('../utils/responseFormatter');
const messages = require('../constants/messages');
const HttpStatus = require('../constants/httpStatus');

// @desc    Create Product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  return successResponse(res, {
    data: product,
    message: messages.product.created,
    statusCode: HttpStatus.CREATED,
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
    message: messages.product.listed,
    meta: result.meta,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Get specific Product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return successResponse(res, {
    data: product,
    message: messages.product.fetched,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Update specific Product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  return successResponse(res, {
    data: product,
    message: messages.product.updated,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Delete specific Product (soft or force based on query param)
// @route   DELETE /api/v1/products/:id?force=true
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.query);

  if (req.query.force === 'true') {
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  return successResponse(res, {
    message: messages.product.deleted,
    statusCode: HttpStatus.OK,
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
    message: messages.product.subcategoriesAdded,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Restore specific Product
// @route   POST /api/v1/products/:id/restore
// @access  Private
exports.restoreProduct = asyncHandler(async (req, res) => {
  const product = await productService.restoreProduct(req.params.id);

  return successResponse(res, {
    data: product,
    message: messages.product.restored,
    statusCode: HttpStatus.OK,
  });
});
