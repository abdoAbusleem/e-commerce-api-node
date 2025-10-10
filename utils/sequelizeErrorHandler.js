const HttpStatus = require('../constants/httpStatus');
const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} = require('sequelize');

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
      message: `This value must be unique. Duplicate value: ${err.errors[0]?.value}.`,
    };
  }

  if (err instanceof ForeignKeyConstraintError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Invalid reference id: related ${err.table} record does not exist.`,
    };
  }

  if (err instanceof DatabaseError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Database error occurred. Please try again later.',
    };
  }

  return null;
}

module.exports = handleSequelizeError;
