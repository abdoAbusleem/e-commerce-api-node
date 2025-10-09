const Joi = require('joi');

// ===== Brand =====
const createBrandSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
});

const brandUpdateSchema = createBrandSchema.fork(['name'], schema => schema.optional());

const idParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createBrandSchema,
  brandUpdateSchema,
  idParamSchema,
};
