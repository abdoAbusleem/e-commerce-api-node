const express = require('express');
const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brand.controller');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../validators/brandValidator');

const router = express.Router();

router.route('/').get(getBrands).post(createBrandValidator, createBrand);

router
  .route('/:id')
  .get(getBrandValidator, getBrandById)
  .patch(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
