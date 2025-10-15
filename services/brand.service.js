const BrandRepository = require('../repositories/brand.repository');
const { throwNotFound } = require('../utils');
const { validateBrandData } = require('../validators/brand/brand.dbValidation');

class BrandService {
  async createBrand(data) {
    await validateBrandData(data.name);
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
    const brand = await BrandRepository.findById(id);
    if (!brand) throwNotFound('brand', id);
    await validateBrandData(data.name, id);

    const updatedBrand = await BrandRepository.update(id, data);
    return updatedBrand;
  }

  async deleteBrand(id) {
    const brand = await BrandRepository.findById(id);
    if (!brand) throwNotFound('brand', id);

    await BrandRepository.delete(id);
  }
}

module.exports = new BrandService();
