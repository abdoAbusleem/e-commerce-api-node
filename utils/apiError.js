class ApiError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;
  }
}

module.exports = ApiError;
