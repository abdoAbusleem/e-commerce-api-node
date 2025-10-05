const handleSequelizeError = require('../utils/sequelizeErrorHandler');

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // handle sequelize error
  const sequelizeHandled = handleSequelizeError(err);
  if (sequelizeHandled) {
    err.statusCode = sequelizeHandled.statusCode;
    err.message = sequelizeHandled.message;
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  const response = {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  };

  // Add validation errors if present
  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(err.statusCode).json(response);
};

const sendErrorForProd = (err, res) => {
  const response = {
    status: err.status,
    message: err.message,
  };

  // Add validation errors if present
  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(err.statusCode).json(response);
};

module.exports = globalError;
