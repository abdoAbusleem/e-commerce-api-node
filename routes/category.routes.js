const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');
const {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
  NestedRouteParams,
} = require('../validators/category/category.schema');
const validate = require('../middlewares/validatorMiddlleware');
const subCategoryRoutes = require('./subcategory.routes');

const router = express.Router();

// Nested route
// Create subcategory on specific category
router.use(
  '/:categoryId/subcategories',
  validate({ params: NestedRouteParams }),
  subCategoryRoutes
);

router
  .route('/')
  .post(validate({ body: createCategorySchema }), createCategory)
  .get(getCategories);
router
  .route('/:id')
  .get(validate({ params: idParamSchema }), getCategoryById)
  .patch(validate({ body: updateCategorySchema, params: idParamSchema }), updateCategory)
  .delete(validate({ params: idParamSchema }), deleteCategory);

module.exports = router;
