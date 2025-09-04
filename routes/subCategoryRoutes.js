  const express = require("express");
  const router = express.Router();
  const { createSubCategory , getSubCategories , getSubCategoryById , updateSubCategory } = require("../services/subCategoryService");
  const { createSubCategoryValidator , getSubCategoryValidator, updateSubCategoryValidator } = require("../utils/validators/subCategoryValidator");


  router.route("/").post(createSubCategoryValidator,createSubCategory).get(getSubCategories);
  router.route("/:id").get(getSubCategoryValidator,getSubCategoryById).patch(updateSubCategoryValidator,updateSubCategory);



  module.exports = router;