const GENERAL = {
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  VALIDATION_ERROR: 'Validation error: invalid data format or value',
};

const PRODUCT = {
  NOT_DELETED: 'Product is not deleted',
  CANNOT_CHANGE_CATEGORY: 'Cannot change category in update, use replaceProductCategory endpoint',
};

const SUBCATEGORY = {
  INVALID_RELATION: 'Some subcategories do not belong to the provided category',
};

const REPOSITORY = {
  CANNOT_USE_INCLUDE_AND_ONLY_DELETED: 'Cannot use includeDeleted and onlyDeleted together',
};

const DATABASE = {
  ERROR: 'Database error occurred. Please try again later',
  CONNECTION_ERROR: 'Database connection failed',
  TRANSACTION_ERROR: 'Transaction failed',
};

const ERROR_BUILDERS = {
  NOT_FOUND: (entity, id) => `${entity} with ID ${id} not found`,
  SOME_NOT_FOUND: entity => `Some ${entity}s not found`,
  UNIQUE_CONSTRAINT_ERROR: value => `This value must be unique. Duplicate value: ${value}.`,
  FOREIGN_KEY_CONSTRAINT_ERROR: table =>
    `Invalid reference id: related ${table} record does not exist.`,
};

module.exports = {
  GENERAL,
  PRODUCT,
  SUBCATEGORY,
  REPOSITORY,
  DATABASE,
  ERROR_BUILDERS,
};
