const HttpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const validate = schemas => {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body, {
          abortEarly: false,
          allowUnknown: false,
          stripUnknown: false,
        });
        if (error) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: messages.validation.validationError,
            errors: error.details.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          });
        }
        req.body = value;
      }

      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params, {
          abortEarly: false,
          allowUnknown: false,
          stripUnknown: true,
        });
        if (error) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: messages.validation.validationError,
            errors: error.details.map(err => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          });
        }
        req.params = value;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validate;
