const ApiError = require('./apiError');

function throwNotFound(entity, id) {
  return new ApiError(`${entity} not found for id: ${id}`, 404);
}

function throwBadRequest(message = 'Bad request') {
  return new ApiError(message, 400);
}

function throwUnauthorized(message = 'Unauthorized') {
  return new ApiError(message, 401);
}

module.exports = {
  throwNotFound,
  throwBadRequest,
  throwUnauthorized,
};
