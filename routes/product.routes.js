const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addSubCategoriesToProduct,
  restoreProduct,
} = require('../controllers/product.controller');
const {
  createProductSchema,
  updateProductSchema,
  addSubCategoriesSchema,
} = require('../validators/product/product.schema');
const { validate } = require('../middlewares');
const { idParamSchema } = require('../validators/shared/id.schema');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(validate({ body: createProductSchema }), createProduct);

router
  .route('/:id')
  .get(validate({ params: idParamSchema }), getProductById)
  .patch(validate({ body: updateProductSchema, params: idParamSchema }), updateProduct)
  .delete(validate({ params: idParamSchema }), deleteProduct);

router
  .route('/:id/subcategories')
  .post(
    validate({ params: idParamSchema, body: addSubCategoriesSchema }),
    addSubCategoriesToProduct
  );

router.post('/:id/restore', validate({ params: idParamSchema }), restoreProduct);

module.exports = router;
