const express = require("express");
const router = express.Router();
const {createCategory, getCategories, getCategoryById ,updateCategory , deleteCategory} = require("../services/categoryService");
const { getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../utils/validators/categoryValidator');

router.route("/").post(createCategoryValidator,createCategory).get(getCategories);
router.route('/:id').get(getCategoryValidator,getCategoryById).patch(updateCategoryValidator,updateCategory).delete(deleteCategory,deleteCategory);

module.exports = router;