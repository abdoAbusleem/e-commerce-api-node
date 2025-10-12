const asyncHandler = require('express-async-handler');
const brandService = require('../services/brand.service');
const { successResponse } = require('../utils/responseFormatter');
const { MESSAGES, HTTP_STATUS } = require('../constants');

// @des     Create Brand
// @route   Post/  api/v1/Brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  return successResponse(res, {
    data: brand,
    message: MESSAGES.SUCCESS.BRAND.CREATED,
    statusCode: HTTP_STATUS.CREATED,
  });
});

// @des     Get list of Brands
// @route   Get/  api/v1/Brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  const result = await brandService.getAllBrands(req.query);

  return successResponse(res, {
    data: result.rows,
    message: MESSAGES.SUCCESS.BRAND.LISTED,
    meta: result.meta,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Get specific brand by id
// @route   GET /api/v1/Brands/:id
// @access  Public
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.id);
  return successResponse(res, {
    data: brand,
    message: MESSAGES.SUCCESS.BRAND.FETCHED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Update specific brand
// @route   PUT /api/v1/Brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res) => {
  const updatedBrand = await brandService.updateBrand(req.params.id, req.body);
  return successResponse(res, {
    data: updatedBrand,
    message: MESSAGES.SUCCESS.BRAND.UPDATED,
    statusCode: HTTP_STATUS.OK,
  });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/Brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res) => {
  await brandService.deleteBrand(req.params.id);
  return res.status(HTTP_STATUS.NO_CONTENT).send();
});
