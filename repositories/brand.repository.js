const { Brand } = require('../models/associations');
const BaseRepository = require('./base.repository');

class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand);
  }

  findByName(name, options = {}) {
    return this.Model.findOne({ where: { name }, ...options });
  }
}

module.exports = new BrandRepository();
