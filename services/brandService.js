const asyncHandler = require('express-async-handler');
const { Brand } = require('../models/index');
const ApiError = require('../utils/apiError');

// @des     Create Brand
// @route   Post/  api/v1/Brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({
    name,
  });

  res.status(201).json({
    status: 'success',
    data: brand,
  });
});

// @des     Get list of Brands
// @route   Get/  api/v1/Brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 5));
  const skip = (page - 1) * limit;

  const { count, rows } = await Brand.findAndCountAll({
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

// @desc    Get specific brand by id
// @route   GET /api/v1/Brands/:id
// @access  Public
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByPk(id);

  // For getBrandById
  if (!brand) {
    return next(new ApiError(`No brand found for this id ${id}`, 404));
  }

  res.status(200).json({
    status: 'success', // ← فقط إضافة هذا للـ consistency
    data: brand,
  });
});

// @desc    Update specific brand
// @route   PUT /api/v1/Brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByPk(id);

  if (!brand) {
    return next(new ApiError(`No brand found for this id: ${id}`, 404));
  }

  await brand.update({ name });

  res.status(200).json({
    status: 'success',
    data: brand,
  });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByPk(id);

  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }

  await brand.destroy();

  res.status(204).send();
});
