const asyncHandler = require('express-async-handler');
const brandService = require('../services/brand.service');

// @des     Create Brand
// @route   Post/  api/v1/Brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  res.status(201).json({ status: 'success', data: brand });
});
// @des     Get list of Brands
// @route   Get/  api/v1/Brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  const result = await brandService.getAllBrands(req.query);

  res.status(200).json({
    status: 'success',
    total: result.pagination.total,
    perPage: result.pagination.perPage,
    currentCount: result.pagination.currentCount,
    currentPage: result.pagination.currentPage,
    data: result.brands,
  });
});

// @desc    Get specific brand by id
// @route   GET /api/v1/Brands/:id
// @access  Public
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.id);
  res.status(200).json({ status: 'success', data: brand });
});

// @desc    Update specific brand
// @route   PUT /api/v1/Brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res) => {
  const updatedBrand = await brandService.updateBrand(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: updatedBrand });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  res.status(204).send();
});
