const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddlleware');

exports.getSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .trim()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name'),
  check('categoryId')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isUUID()
    .withMessage('Invalid Category id format'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isUUID().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];
