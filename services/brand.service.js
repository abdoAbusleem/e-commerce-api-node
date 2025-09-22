const BrandRepository = require('../repositories/brand.repository');
const ApiError = require('../utils/apiError');

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
    if (!brand) throw new ApiError(`No brand found for this id ${id}`, 404);
    return brand;
  }

  async updateBrand(id, data) {
    const brand = await BrandRepository.exists(id);
    if (!brand) throw new ApiError(`No brand found for this id: ${id}`, 404);

    await BrandRepository.update(id, data);
    return BrandRepository.findById(id);
  }

  async deleteBrand(id) {
    const brand = await BrandRepository.exists(id);
    if (!brand) throw new ApiError(`No brand found for this id: ${id}`, 404);

    const deletedBrand = await BrandRepository.delete(id);
    return deletedBrand;
  }

  async checkBrandExists(id) {
    const exists = await BrandRepository.brandExists(id);
    return exists;
  }
}

module.exports = new BrandService();
