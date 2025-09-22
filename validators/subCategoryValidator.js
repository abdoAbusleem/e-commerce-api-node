const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddlleware');
const { Category } = require('../models/associations');
const { validateEntityExists } = require('../helpers/validationHelpers');

exports.getSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  body('name')
    .notEmpty()
    .trim()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),

  body('categoryId')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isUUID()
    .withMessage('Invalid Category id format')
    .custom(validateEntityExists(Category, 'categoryId')),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid Subcategory id format'),
  body('categoryId')
    .optional()
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isUUID()
    .withMessage('Invalid Category id format')
    .custom(validateEntityExists(Category, 'categoryId')),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];
