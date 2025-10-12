const ApiError = require('./apiError');
const { MESSAGES, HTTP_STATUS } = require('../constants');

function throwNotFound(entity, id) {
  throw new ApiError(MESSAGES.ERROR.ERROR_BUILDERS.NOT_FOUND(entity, id), HTTP_STATUS.NOT_FOUND);
}

function throwBadRequest(message = MESSAGES.ERROR.ERROR_BUILDERS.BAD_REQUEST) {
  throw new ApiError(message, HTTP_STATUS.BAD_REQUEST);
}

function throwUnauthorized(message = MESSAGES.ERROR.ERROR_BUILDERS.UNAUTHORIZED) {
  throw new ApiError(message, HTTP_STATUS.UNAUTHORIZED);
}

module.exports = { throwNotFound, throwBadRequest, throwUnauthorized };
