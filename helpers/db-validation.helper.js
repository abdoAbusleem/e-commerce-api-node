const { throwNotFound, ApiError } = require('../utils');
const { MESSAGES, HTTP_STATUS } = require('../constants');

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
    throw new ApiError(
      MESSAGES.ERROR.ERROR_BUILDERS.SOME_NOT_FOUND(entityName),
      HTTP_STATUS.NOT_FOUND
    );
  }
  return entities;
}

async function checkUniqueName(repository, name, entityName, excludeId = null, scope = {}) {
  if (!name) return;

  const where = { name, ...scope };
  const existing = await repository.Model.findOne({ where });

  if (existing && existing.id !== excludeId) {
    const scopeText = Object.keys(scope).length
      ? `within the same ${Object.keys(scope).join(', ')}`
      : '';

    throw new ApiError(
      `${entityName} with this name already exists ${scopeText}`,
      HTTP_STATUS.CONFLICT
    );
  }
}

module.exports = {
  checkExists,
  checkManyExists,
  checkUniqueName,
};
