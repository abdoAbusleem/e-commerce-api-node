const { MESSAGES, HTTP_STATUS } = require('../constants');

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
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.ERROR.GENERAL.VALIDATION_ERROR,
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
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: MESSAGES.ERROR.GENERAL.VALIDATION_ERROR,
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
