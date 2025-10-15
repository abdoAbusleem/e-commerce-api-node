const globalError = require('./error-middleware');
const { setParamToBody } = require('./nested-route.middleware');
const validate = require('./validator-middleware');

module.exports = {
  globalError,
  setParamToBody,
  validate,
};
