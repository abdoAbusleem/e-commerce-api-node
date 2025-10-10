const asyncHandler = require('express-async-handler');
const subCategoryService = require('../services/subcategory.service');
const { successResponse } = require('../utils/responseFormatter');
const { successMessage } = require('../constants/messages');
const HttpStatus = require('../constants/httpStatus');

// @des     Create SubCategory
// @route   Post/  api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.createSubCategory(req.body);
  return successResponse(res, {
    data: subCategory,
    message: successMessage('SubCategory', 'create'),
    statusCode: HttpStatus.CREATED,
  });
});

// @des     Get list of SubCategories
// @route   Get/  api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const result = await subCategoryService.getAllSubCategories(req.query, req.params.categoryId);
  return successResponse(res, {
    data: result.rows,
    message: successMessage('SubCategory', 'list'),
    meta: result.meta,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Get specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
  return successResponse(res, {
    data: subCategory,
    message: successMessage('SubCategory', 'fetch'),
    statusCode: HttpStatus.OK,
  });
});

// @desc    Update specific subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.updateSubCategory(req.params.id, req.body);
  return successResponse(res, {
    data: subCategory,
    message: successMessage('SubCategory', 'update'),
    statusCode: HttpStatus.OK,
  });
});

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res) => {
  await subCategoryService.deleteSubCategory(req.params.id);
  return res.status(HttpStatus.NO_CONTENT).send();
});
