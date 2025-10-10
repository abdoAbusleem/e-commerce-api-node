const ApiError = require('../utils/apiError');
const { throwNotFound } = require('../utils/errors');
const HttpStatus = require('../constants/httpStatus');

async function checkExists(repository, id, entityName) {
  if (!id) return null;
  const entity = await repository.findById(id);
  if (!entity) throwNotFound(entityName, id);
  return entity;
}

async function checkManyExists(repository, ids, entityName) {
  if (!ids?.length) return [];
  const entities = await repository.findByIds(ids);
  if (entities.length !== ids.length) {
    throw new ApiError(`Some ${entityName} not found`, HttpStatus.NOT_FOUND);
  }
  return entities;
}

module.exports = {
  checkExists,
  checkManyExists,
};
