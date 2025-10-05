const Joi = require('joi');

const createSubCategorySchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  categoryId: Joi.string().uuid().required(),
});

const updateSubCategorySchema = createSubCategorySchema.fork(['name', 'categoryId'], schema =>
  schema.optional()
);

const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createSubCategorySchema,
  updateSubCategorySchema,
  idParamSchema,
};
