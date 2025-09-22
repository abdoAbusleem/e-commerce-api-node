const { Brand } = require('../models/associations');

class BrandRepository {
  create(data, options = {}) {
    return Brand.create(data, options);
  }

  findAll(options = {}) {
    const { page = 1, limit = 5, filter = {}, order = [['createdAt', 'DESC']] } = options;
    const offset = (page - 1) * limit;

    return Brand.findAndCountAll({
      where: filter,
      order,
      limit,
      offset,
    });
  }

  findById(id, options = {}) {
    return Brand.findByPk(id, options);
  }

  update(id, data, options = {}) {
    return Brand.update(data, { where: { id }, ...options });
  }

  delete(id, options = {}) {
    return Brand.destroy({ where: { id }, ...options });
  }

  async exists(id, options = {}) {
    const count = await Brand.count({ where: { id }, ...options });
    return count > 0;
  }
}

module.exports = new BrandRepository();
