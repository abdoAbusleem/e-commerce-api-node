const ApiError = require('./apiError');
const HttpStatus = require('../constants/httpStatus');

function throwNotFound(entity, id) {
  throw new ApiError(`${entity} not found for id: ${id}`, HttpStatus.NOT_FOUND);
}

function throwBadRequest(message = 'Bad request') {
  throw new ApiError(message, HttpStatus.BAD_REQUEST);
}

function throwUnauthorized(message = 'Unauthorized') {
  throw new ApiError(message, HttpStatus.UNAUTHORIZED);
}

module.exports = { throwNotFound, throwBadRequest, throwUnauthorized };
