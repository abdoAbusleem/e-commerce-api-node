const express = require('express');
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
} = require('../controllers/subcategory.controller');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} = require('../validators/subCategoryValidator');
const { setParamToBody } = require('../middlewares/nestedRoutes');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(setParamToBody('categoryId'), createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategoryById)
  .patch(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
