const { Category } = require('../models/associations');
const BaseRepository = require('./base.repository');

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }

  findByName(name, options = {}) {
    return this.Model.findOne({ where: { name }, ...options });
  }
}

module.exports = new CategoryRepository();
