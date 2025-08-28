const express = require("express");
const {createCategory, getCategories, getCategoryById ,updateCategory , deleteCategory} = require("../services/categoryService");
const router = express.Router();
const { getCategoryValidator } = require('../utils/validators/categoryValidator');

router.route("/").post(createCategory).get(getCategories);
router.route('/:id').get(getCategoryValidator,getCategoryById).patch(updateCategory).delete(deleteCategory);

module.exports = router;