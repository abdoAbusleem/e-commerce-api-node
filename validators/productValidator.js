// validators/productValidator.js
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddlleware');
const validateProductDeps = require('../middlewares/validateProductDeps');
const BodyValidator = require('../middlewares/bodyValidator');

const allowedFields = [
  'title',
  'description',
  'price',
  'priceAfterDiscount',
  'colors',
  'imageCover',
  'images',
  'categoryId',
  'subCategoryIds',
  'brandId',
  'ratingsAverage',
  'ratingsQuantity',
  'quantity',
  'sold',
];

exports.createProductValidator = [
  BodyValidator.whiteList(allowedFields, { strict: true }),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Product title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be 3-100 chars'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be 20-2000 chars'),

  body('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number')
    .isLength({ max: 6 })
    .withMessage('To long quantity'),

  body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),

  body('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat(),

  body('colors').optional().isArray().withMessage('availableColors should be array of string'),

  body('imageCover').notEmpty().withMessage('Product imageCover is required'),

  body('images').optional().isArray().withMessage('images should be array of string'),

  body('categoryId')
    .notEmpty()
    .withMessage('CategoryId is required')
    .isUUID()
    .withMessage('Invalid UUID format for categoryId'),

  body('subCategoryIds').optional().isArray().withMessage('subCategoryIds must be an array'),

  body('brandId').optional().isUUID().withMessage('Invalid UUID format for brandId'),

  body('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

  body('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,

  validateProductDeps,
];

exports.updateProductValidator = [
  BodyValidator.whiteList(allowedFields, { strict: false }),
  check('id').isUUID().withMessage('Invalid Product id format'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be 3-100 chars'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be 20-2000 chars'),

  body('categoryId').optional().isUUID().withMessage('Invalid UUID format for categoryId'),

  body('subCategoryIds').optional().isArray().withMessage('subCategoryIds must be an array'),

  body('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number')
    .isLength({ max: 6 })
    .withMessage('To long quantity'),

  body('brandId').optional().isUUID().withMessage('Invalid UUID format for brandId'),

  body('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),

  body('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),

  body('price')
    .optional()
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),

  body('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat(),

  body('colors').optional().isArray().withMessage('availableColors should be array of string'),

  body('imageCover').optional().notEmpty().withMessage('Product imageCover is required'),

  body('images').optional().isArray().withMessage('images should be array of string'),

  validatorMiddleware,

  validateProductDeps,
];

exports.addSubCategoriesToProductValidator = [
  check('id').isUUID().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isUUID().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isUUID().withMessage('Invalid ID formate'),
  validatorMiddleware,
];
