const asyncHandler = require('express-async-handler');
const brandService = require('../services/brand.service');
const { successResponse } = require('../utils/responseFormatter');
const messages = require('../constants/messages');
const HttpStatus = require('../constants/httpStatus');

// @des     Create Brand
// @route   Post/  api/v1/Brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  return successResponse(res, {
    data: brand,
    message: messages.brand.created,
    statusCode: HttpStatus.CREATED,
  });
});

// @des     Get list of Brands
// @route   Get/  api/v1/Brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  const result = await brandService.getAllBrands(req.query);

  return successResponse(res, {
    data: result.rows,
    message: messages.brand.listed,
    meta: result.meta,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Get specific brand by id
// @route   GET /api/v1/Brands/:id
// @access  Public
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.id);
  return successResponse(res, {
    data: brand,
    message: messages.brand.fetched,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Update specific brand
// @route   PUT /api/v1/Brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res) => {
  const updatedBrand = await brandService.updateBrand(req.params.id, req.body);
  return successResponse(res, {
    data: updatedBrand,
    message: messages.brand.updated,
    statusCode: HttpStatus.OK,
  });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  return res.status(HttpStatus.NO_CONTENT).send();
});
