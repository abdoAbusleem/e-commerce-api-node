const {
  getCategoryIdToUse,
  validateCategory,
  validateSubCategories,
  validateBrand,
} = require('../helpers/validationHelpers');
const BusinessRules = require('../helpers/businessRules');

const validateProductDeps = async (req, res, next) => {
  try {
    const errors = [];

    const { price, priceAfterDiscount, quantity, sold, subCategoryIds, brandId } = req.body;

    const productId = req.params?.id || null;

    const categoryIdToUse = await getCategoryIdToUse(req.body, productId);

    const [categoryError, subCatError, brandError] = await Promise.all([
      validateCategory(categoryIdToUse),
      validateSubCategories(subCategoryIds, categoryIdToUse),
      validateBrand(brandId),
    ]);

    if (categoryError) errors.push(categoryError);
    if (subCatError) errors.push(subCatError);
    if (brandError) errors.push(brandError);

    if (price || priceAfterDiscount) {
      const priceError = BusinessRules.validatePriceLogic(price, priceAfterDiscount);
      if (priceError) errors.push({ field: 'priceAfterDiscount', message: priceError });
    }

    if (quantity || sold) {
      const inventoryError = BusinessRules.validateInventoryLogic(quantity, sold);
      if (inventoryError) errors.push({ field: 'sold', message: inventoryError });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal validation error',
    });
  }
};

module.exports = validateProductDeps;
