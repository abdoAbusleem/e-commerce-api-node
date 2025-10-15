const { SubCategory } = require('../models/associations');
const BaseRepository = require('./base.repository');

class SubCategoryRepository extends BaseRepository {
  constructor() {
    super(SubCategory);
  }

  findByName(name, options = {}) {
    return this.Model.findOne({ where: { name }, ...options });
  }
}

module.exports = new SubCategoryRepository();
