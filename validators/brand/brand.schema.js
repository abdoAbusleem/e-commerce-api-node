const Joi = require('joi');

// ===== Brand =====
const createBrandSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
});

const brandUpdateSchema = createBrandSchema.fork(['name'], schema => schema.optional());

module.exports = {
  createBrandSchema,
  brandUpdateSchema,
};
