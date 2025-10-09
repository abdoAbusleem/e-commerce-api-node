// controllers/category.controller.js
const asyncHandler = require('express-async-handler');
const categoryService = require('../services/category.service');
const { successResponse } = require('../utils/responseFormatter');
const { successMessage } = require('../common/messages');
const HttpStatus = require('../common/httpStatus');

// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  return successResponse(res, {
    data: category,
    message: successMessage('Category', 'create'),
    statusCode: HttpStatus.CREATED,
  });
});

// @desc    Get list of Categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const result = await categoryService.getAllCategories(req.query);

  return successResponse(res, {
    data: result.rows,
    message: successMessage('Category', 'list'),
    meta: result.meta,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Get specific Category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  return successResponse(res, {
    data: category,
    message: successMessage('Category', 'fetch'),
    statusCode: HttpStatus.OK,
  });
});

// @desc    Update specific Category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);

  return successResponse(res, {
    data: category,
    message: successMessage('Category', 'update'),
    statusCode: HttpStatus.OK,
  });
});

// @desc    Delete specific Category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  return res.status(HttpStatus.NO_CONTENT).send();
});
