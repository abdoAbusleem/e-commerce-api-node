const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  forceDeleteProduct,
  softDeleteProduct,
  addSubCategoriesToProduct,
} = require('../controllers/product.controller');
const {
  createProductValidator,
  updateProductValidator,
  getProductValidator,
  deleteProductValidator,
} = require('../validators/productValidator');

const router = express.Router();

router.route('/').get(getProducts).post(createProductValidator, createProduct);
router
  .route('/:id')
  .get(getProductValidator, getProductById)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, softDeleteProduct);
router.delete('/:id/force', deleteProductValidator, forceDeleteProduct);
router.post('/:id/subcategories', addSubCategoriesToProduct);

module.exports = router;
