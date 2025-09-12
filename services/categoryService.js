const asyncHandler = require('express-async-handler');
const { Category } = require('../models/index');
const ApiError = require('../utils/apiError');

// @des     Create Category
// @route   Post/  api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
  });

  res.status(201).json({
    status: 'success',
    data: category,
  });
});

// @des     Get list of Ca tegories
// @route   Get/  api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 5));
  const skip = (page - 1) * limit;

  const { count, rows } = await Category.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset: skip,
  });

  res.status(200).json({
    status: 'success',
    total: count,
    perPage: limit,
    currentCount: rows.length,
    currentPage: page,
    data: rows,
  });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  // For getCategoryById
  if (!category) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }

  res.status(200).json({
    status: 'success', // ← فقط إضافة هذا للـ consistency
    data: category,
  });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByPk(id);

  if (!category) {
    return next(new ApiError(`No category found for this id: ${id}`, 404));
  }

  await category.update({ name });

  res.status(200).json({
    status: 'success',
    data: category,
  });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }

  await category.destroy();

  res.status(204).send();
});
