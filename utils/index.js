const errors = require('./errors');
const response = require('./response');
const pagination = require('./pagination');

module.exports = {
  ...errors,
  ...response,
  ...pagination,
};
