const Joi = require('joi');

const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(20).max(2000).required(),
  price: Joi.number().max(9999999999).required(),
  priceAfterDiscount: Joi.number().less(Joi.ref('price')).optional(),
  quantity: Joi.number().max(999999).required(),
  sold: Joi.number().max(Joi.ref('quantity')).optional(),
  colors: Joi.array().items(Joi.string()).optional(),
  imageCover: Joi.string().required(),
  images: Joi.array().items(Joi.string()).optional(),
  categoryId: Joi.string().uuid().required(),
  subCategoryIds: Joi.array().items(Joi.string().uuid()).optional(),
  brandId: Joi.string().uuid().optional(),
  ratingsAverage: Joi.number().min(1).max(5).optional(),
  ratingsQuantity: Joi.number().optional(),
});

const updateProductSchema = createProductSchema
  .fork(['title', 'description', 'price', 'quantity', 'imageCover', 'subCategoryIds'], schema =>
    schema.optional()
  )
  .append({
    categoryId: Joi.forbidden(),
  });

const addSubCategoriesSchema = Joi.object({
  subCategoryIds: Joi.array().items(Joi.string().uuid()).min(1).required(),
});

const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  idParamSchema,
  addSubCategoriesSchema,
};
