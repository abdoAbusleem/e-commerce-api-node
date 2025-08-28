const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddlleware');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

