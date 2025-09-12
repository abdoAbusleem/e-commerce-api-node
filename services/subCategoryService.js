const asyncHandler = require('express-async-handler');
const { SubCategory } = require('../models/index');
const ApiError = require('../utils/apiError');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @des     Create SubCategory
// @route   Post/  api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, categoryId } = req.body;

  const subCategory = await SubCategory.create({
    name,
    categoryId,
  });

  res.status(201).json({ data: subCategory });
});

// @des     Get list of SubCategories
// @route   Get/  api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 5));
  const skip = (page - 1) * limit;

  const filter = req.params.categoryId ? { categoryId: req.params.categoryId } : {};

  const { count, rows } = await SubCategory.findAndCountAll({
    where: filter,
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

// @desc    Get specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findByPk(id);

  // For getSubCategoryById
  if (!subCategory) {
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(200).json({
    status: 'success', // ← فقط إضافة هذا للـ consistency
    data: subCategory,
  });
});

// @desc    Update specific subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;

  const subCategory = await SubCategory.findByPk(id);

  if (!subCategory) {
    return next(new ApiError(`No subcategory found for this id: ${id}`, 404));
  }

  await subCategory.update({ name, categoryId });

  res.status(200).json({
    status: 'success',
    data: subCategory,
  });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await SubCategory.findByPk(id);

  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }

  await category.destroy();

  res.status(204).send();
});
