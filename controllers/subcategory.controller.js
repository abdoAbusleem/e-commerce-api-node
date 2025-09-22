const asyncHandler = require('express-async-handler');
const subCategoryService = require('../services/subcategory.service');

// @des     Create SubCategory
// @route   Post/  api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.createSubCategory(req.body);
  res.status(201).json({ data: subCategory });
});

// @des     Get list of SubCategories
// @route   Get/  api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const result = await subCategoryService.getAllSubCategories(req.query, req.params.categoryId);

  res.status(200).json({
    status: 'success',
    total: result.pagination.total,
    perPage: result.pagination.perPage,
    currentCount: result.pagination.currentCount,
    currentPage: result.pagination.currentPage,
    data: result.subCategories,
  });
});

// @desc    Get specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
  res.status(200).json({ status: 'success', data: subCategory });
});

// @desc    Update specific subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryService.updateSubCategory(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: subCategory });
});

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res) => {
  await subCategoryService.deleteSubCategory(req.params.id);
  res.status(204).send();
});
