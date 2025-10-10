const ApiError = require('./apiError');
const HttpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

function throwNotFound(entity, id) {
  throw new ApiError(messages.errors.notFound(entity, id), HttpStatus.NOT_FOUND);
}

function throwBadRequest(message = messages.errors.badRequest) {
  throw new ApiError(message, HttpStatus.BAD_REQUEST);
}

function throwUnauthorized(message = messages.errors.unauthorized) {
  throw new ApiError(message, HttpStatus.UNAUTHORIZED);
}

module.exports = { throwNotFound, throwBadRequest, throwUnauthorized };
