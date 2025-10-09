function successMessage(entity, action) {
  const actions = {
    create: `${entity} created successfully`,
    update: `${entity} updated successfully`,
    delete: `${entity} deleted successfully`,
    fetch: `${entity} retrieved successfully`,
    list: `${entity}s retrieved successfully`,
  };

  return actions[action] || 'Success';
}

module.exports = { successMessage };
