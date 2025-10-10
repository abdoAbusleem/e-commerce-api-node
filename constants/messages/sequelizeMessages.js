module.exports = {
  validationError: 'Validation error: invalid data format or value.',
  uniqueConstraintError: value => `This value must be unique. Duplicate value: ${value}.`,
  foreignKeyConstraintError: table =>
    `Invalid reference id: related ${table} record does not exist.`,
  databaseError: 'Database error occurred. Please try again later.',
};
