const brandRepository = require('../repositories/brand.repository');
const ApiError = require('../utils/apiError');

class BrandService {
  async createBrand(data) {
    const brand = await brandRepository.create(data);
    return brand;
  }

  async getAllBrands(queryParams) {
    const page = Math.max(1, parseInt(queryParams.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(queryParams.limit) || 5));

    const result = await brandRepository.findAll({ page, limit });

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
    const brand = await brandRepository.findById(id);
    if (!brand) throw new ApiError(`No brand found for this id ${id}`, 404);
    return brand;
  }

  async updateBrand(id, data) {
    const brand = await brandRepository.findById(id);
    if (!brand) throw new ApiError(`No brand found for this id: ${id}`, 404);

    const updatedBrand = await brandRepository.update(brand, data);
    return updatedBrand;
  }

  async deleteBrand(id) {
    const brand = await brandRepository.findById(id);
    if (!brand) throw new ApiError(`No brand found for this id ${id}`, 404);

    const deletedBrand = await brandRepository.delete(brand);
    return deletedBrand;
  }
}

module.exports = new BrandService();
