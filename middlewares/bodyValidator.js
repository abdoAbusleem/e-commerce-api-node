class BodyValidator {
  static whiteList(allowedFields, options = {}) {
    const { strict = false, stripUnknown = false } = options;
    return (req, res, next) => {
      const bodyKeys = Object.keys(req.body);

      const extraFields = bodyKeys.filter(key => !allowedFields.includes(key));

      if (extraFields.length > 0) {
        if (strict) {
          return res.status(400).json({
            success: false,
            message: 'Request contains invalid fields',
            invalidFields: extraFields,
            allowedFields,
          });
        }
      }
      if (stripUnknown) {
        extraFields.forEach(field => delete req.body[field]);
      }
      next();
    };
  }
}

module.exports = BodyValidator;
