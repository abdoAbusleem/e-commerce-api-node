const HttpStatus = require('../constants/httpStatus');

function successResponse(
  res,
  { data = null, message = 'success', meta = null, statusCode = HttpStatus.OK }
) {
  const response = { success: true, message };

  if (data) response.data = data;
  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
}

function errorResponse(
  res,
  { message = 'Something went wrong', errors = null, statusCode = HttpStatus.BAD_REQUEST }
) {
  const response = { success: false, message };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
}

module.exports = { successResponse, errorResponse };
