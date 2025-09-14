const express = require('express');
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  setCategoryIdToBody,
} = require('../controllers/subcategory.controller');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} = require('../validators/subCategoryValidator');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategoryById)
  .patch(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
