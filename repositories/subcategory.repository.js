const { SubCategory } = require('../models/associations');
const BaseRepository = require('./base.repository');

class SubCategoryRepository extends BaseRepository {
  constructor() {
    super(SubCategory);
  }
}

module.exports = new SubCategoryRepository();
