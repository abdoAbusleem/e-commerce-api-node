// controllers/category.controller.js
const asyncHandler = require('express-async-handler');
const productService = require('../services/product.service');

// @desc    Create Product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    status: 'success',
    data: product,
  });
});

// @desc    Get list of Products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getAllProducts(req.query);

  res.status(200).json({
    status: 'success',
    total: result.pagination.total,
    perPage: result.pagination.perPage,
    currentCount: result.pagination.currentCount,
    currentPage: result.pagination.currentPage,
    data: result.products,
  });
});

// @desc    Get specific Product by ID
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

// @desc    Update specific Product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

// @desc    Delete specific Product
// @route   DELETE /api/v1/products/:id/force
// @access  Private
exports.forceDeleteProduct = asyncHandler(async (req, res) => {
  await productService.forceDeleteProduct(req.params.id);

  res.status(204).send();
});

// @desc    Delete specific Product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.softDeleteProduct = asyncHandler(async (req, res) => {
  await productService.softDeleteProduct(req.params.id);

  res.status(204).send();
});

exports.addSubCategoriesToProduct = asyncHandler(async (req, res) => {
  const product = await productService.addSubCategoriesToProduct(
    req.params.id,
    req.body.subCategoryIds
  );

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.replaceProductSubCategories = asyncHandler(async (req, res) => {
  const product = await productService.replaceProductSubCategories(
    req.params.id,
    req.body.subCategoryIds
  );
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
