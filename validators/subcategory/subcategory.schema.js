const Joi = require('joi');

const createSubCategorySchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  categoryId: Joi.string().uuid().required(),
});

const updateSubCategorySchema = createSubCategorySchema.fork(['name', 'categoryId'], schema =>
  schema.optional()
);

module.exports = {
  createSubCategorySchema,
  updateSubCategorySchema,
};
