const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddlleware');

exports.getCategoryValidator = [
  check('id').isUUID().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check('name')
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
  check('name')
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
