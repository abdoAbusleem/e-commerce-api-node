const express = require('express');
const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brand.controller');
const {
  createBrandSchema,
  brandUpdateSchema,
  idParamSchema,
} = require('../validators/brand/brand.schema');
const validate = require('../middlewares/validatorMiddlleware');

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(validate({ body: createBrandSchema }), createBrand);

router
  .route('/:id')
  .get(validate({ params: idParamSchema }), getBrandById)
  .patch(validate({ body: brandUpdateSchema, params: idParamSchema }), updateBrand)
  .delete(validate({ params: idParamSchema }), deleteBrand);

module.exports = router;
