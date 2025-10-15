exports.setParamToBody = (paramKey, bodyKey = paramKey) => {
  return (req, res, next) => {
    if (!req.body[bodyKey] && req.params[paramKey]) {
      req.body[bodyKey] = req.params[paramKey];
    }
    next();
  };
};
