const { check, body, param } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddlleware');
const { validateEntityExists } = require('../helpers/validationHelpers');
const { Category } = require('../models/associations');

exports.getCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.validateCategoryIdParam = [
  param('categoryId')
    .isUUID()
    .withMessage('Invalid Category id format')
    .custom(validateEntityExists(Category, 'id')),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .trim()
    .withMessage('Too long category name'),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format'),
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format'),
  validatorMiddleware,
];
