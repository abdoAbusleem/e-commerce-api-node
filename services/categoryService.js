const Category = require("../models/categoryModel");
const asyncHandler = require('express-async-handler'); 
const ApiError = require('../utils/apiError');
const { where } = require("sequelize");


// @des     Create Category
// @route   Post/  api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });
  res.status(201).json(category);
}); 


// @des     Get list of Categories
// @route   Get/  api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; 

  const listOfCategories = await Category.findAll({
    limit,
    offset: skip,
  })
  const total = await Category.count();


  res.status(200).json({total : total , page ,data : listOfCategories});
});


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res , next) => {
  const { id } = req.params;


  const category = await Category.findByPk(id);

  // For getCategoryById
  if(!category){
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
  
});


// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res , next) => {
  const { id } = req.params;
  const {name} = req.body;

  const category = await Category.findByPk(id);

  if(!category){
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  await category.update({name});

  await category.reload();


  res.status(200).json({ data: category });
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
