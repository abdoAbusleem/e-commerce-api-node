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

    const result = await BrandRepository.findAll({ page, limit });

    return {
      brands: result.rows,
      pagination: {
        total: result.count,
        perPage: limit,
        currentCount: result.rows.length,
        currentPage: page,
      },
    };
  }

  async getBrandById(id) {
    const brand = await BrandRepository.findById(id);
    if (!brand) throw throwNotFound('brand', id);
    return brand;
  }

  async updateBrand(id, data) {
    const exists = await BrandRepository.exists(id);
    if (!exists) throw throwNotFound('brand', id);

    await BrandRepository.update(id, data);
    return BrandRepository.findById(id);
  }

  async deleteBrand(id) {
    const exists = await BrandRepository.exists(id);
    if (!exists) throw throwNotFound('brand', id);

    await BrandRepository.delete(id);
    return { message: 'Brand deleted successfully' };
  }
}

module.exports = new BrandService();
