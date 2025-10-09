const BrandRepository = require('../repositories/brand.repository');
const { throwNotFound } = require('../utils/errors');

class BrandService {
  async createBrand(data) {
    const brand = await BrandRepository.create(data);
    return brand;
  }

  async getAllBrands(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const { rows, meta } = await BrandRepository.findAll({
      page,
      limit,
    });
    return {
      rows,
      meta,
    };
  }

  async getBrandById(id) {
    const brand = await BrandRepository.findById(id);
    if (!brand) throwNotFound('brand', id);
    return brand;
  }

  async updateBrand(id, data) {
    const exists = await BrandRepository.exists(id);
    if (!exists) throwNotFound('brand', id);

    const brand = await BrandRepository.update(id, data);
    return brand;
  }

  async deleteBrand(id) {
    const exists = await BrandRepository.exists(id);
    if (!exists) throwNotFound('brand', id);

    await BrandRepository.delete(id);
  }
}

module.exports = new BrandService();
