const { SubCategory } = require("../models/index");
const asyncHandler = require('express-async-handler'); 
const ApiError = require('../utils/apiError');




// @des     Create SubCategory
// @route   Post/  api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name , categoryId } = req.body;
  const subCategory = await SubCategory.create({
    name,
    categoryId,
  });
  res.status(201).json({data : subCategory});
});  





// @des     Get list of SubCategories
// @route   Get/  api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; 

  const listOfSubCategories = await SubCategory.findAll({
    limit,
    offset: skip,
  })
  const total = await SubCategory.count();


  res.status(200).json({total : total , page ,data : listOfSubCategories});
});


// @desc    Get specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryById = asyncHandler(async (req, res , next) => {
  const { id } = req.params;


  const subCategory = await SubCategory.findByPk(id);

  // For getSubCategoryById
  if(!subCategory){
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
  
});



// @desc    Update specific subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res , next) => {
  const { id } = req.params;
  const {name,categoryId} = req.body;

  const subCategory = await SubCategory.findByPk(id);

  if(!subCategory){
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  await subCategory.update({name,categoryId});

  await subCategory.reload();


  res.status(200).json({ data: subCategory });
});


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res , next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if(!category){
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  
  await category.destroy();

  res.status(204).send();
});
