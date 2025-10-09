const { Brand } = require('../models/associations');
const BaseRepository = require('./base.repository');

class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand);
  }
}

module.exports = new BrandRepository();
