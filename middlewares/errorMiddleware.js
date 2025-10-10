const handleSequelizeError = require('../utils/sequelizeErrorHandler');
const HttpStatus = require('../constants/httpStatus');

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
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
