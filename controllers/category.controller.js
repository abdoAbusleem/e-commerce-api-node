// controllers/category.controller.js
const asyncHandler = require('express-async-handler');
const categoryService = require('../services/category.service');

// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json({
    status: 'success',
    data: category,
  });
});

// @desc    Get list of Categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const result = await categoryService.getAllCategories(req.query);

  res.status(200).json({
    status: 'success',
    total: result.pagination.total,
    perPage: result.pagination.perPage,
    currentCount: result.pagination.currentCount,
    currentPage: result.pagination.currentPage,
    data: result.categories,
  });
});

// @desc    Get specific Category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

// @desc    Update specific Category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

// @desc    Delete specific Category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.status(204).send();
});
