const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} = require('sequelize');
const { MESSAGES, HTTP_STATUS } = require('../constants');

function handleSequelizeError(err) {
  if (err instanceof ValidationError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: err.errors.map(e => e.message).join(', '),
    };
  }

  if (err instanceof UniqueConstraintError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: MESSAGES.ERROR.ERROR_BUILDERS.UNIQUE_CONSTRAINT_ERROR(err.errors[0]?.value),
    };
  }

  if (err instanceof ForeignKeyConstraintError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: MESSAGES.ERROR.ERROR_BUILDERS.FOREIGN_KEY_CONSTRAINT_ERROR(err.table),
    };
  }

  if (err instanceof DatabaseError) {
    return {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: MESSAGES.ERROR.DATABASE.DATABASE_ERROR,
    };
  }

  return null;
}

module.exports = handleSequelizeError;
