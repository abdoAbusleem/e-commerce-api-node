const handleSequelizeError = require('../utils/sequelizeErrorHandler');
const { HTTP_STATUS } = require('../constants');

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

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
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = globalError;
