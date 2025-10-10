const HttpStatus = require('../constants/httpStatus');
const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} = require('sequelize');
const messages = require('../constants/messages');

function handleSequelizeError(err) {
  if (err instanceof ValidationError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: err.errors.map(e => e.message).join(', '),
    };
  }

  if (err instanceof UniqueConstraintError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: messages.sequelize.uniqueConstraintError(err.errors[0]?.value),
    };
  }

  if (err instanceof ForeignKeyConstraintError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: messages.sequelize.foreignKeyConstraintError(err.table),
    };
  }

  if (err instanceof DatabaseError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: messages.sequelize.databaseError,
    };
  }

  return null;
}

module.exports = handleSequelizeError;
