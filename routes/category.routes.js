const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../validators/categoryValidator');
const subCategoryRoutes = require('./subcategory.routes');

const router = express.Router();

// Nested route
// Create subcategory on specific category
router.use('/:categoryId/subcategories', subCategoryRoutes);

router.route('/').post(createCategoryValidator, createCategory).get(getCategories);
router
  .route('/:id')
  .get(getCategoryValidator, getCategoryById)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
