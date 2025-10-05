const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  forceDeleteProduct,
  softDeleteProduct,
  addSubCategoriesToProduct,
  replaceProductSubCategories,
} = require('../controllers/product.controller');
const {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
} = require('../validators/product/product.schema');
const validate = require('../middlewares/validatorMiddlleware');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(validate({ body: createProductSchema }), createProduct);
router
  .route('/:id')
  .get(validate({ params: idParamSchema }), getProductById)
  .patch(validate({ body: updateProductSchema, params: idParamSchema }), updateProduct)
  .delete(validate({ params: idParamSchema }), softDeleteProduct);
router
  .route('/:id/subcategories')
  .post(validate({ params: idParamSchema }), addSubCategoriesToProduct)
  .put(validate({ params: idParamSchema }), replaceProductSubCategories);
router.delete('/:id/force', validate({ params: idParamSchema }), forceDeleteProduct);

module.exports = router;
