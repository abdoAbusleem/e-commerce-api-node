const Joi = require('joi');

// ===== SubCategory =====
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
});

const updateCategorySchema = createCategorySchema.fork(['name'], schema => schema.optional());

const NestedRouteParams = Joi.object({
  categoryId: Joi.string().uuid().required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  NestedRouteParams,
};
