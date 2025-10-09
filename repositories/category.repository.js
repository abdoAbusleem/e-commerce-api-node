const { Category } = require('../models/associations');
const BaseRepository = require('./base.repository');

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }
}

module.exports = new CategoryRepository();
