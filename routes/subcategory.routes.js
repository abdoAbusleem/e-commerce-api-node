const express = require('express');
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subcategory.controller');
const {
  createSubCategorySchema,
  updateSubCategorySchema,
} = require('../validators/subcategory/subcategory.schema');
const { idParamSchema } = require('../validators/shared/id.schema');

const { validate, setParamToBody } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    setParamToBody('categoryId'),
    validate({ body: createSubCategorySchema }),
    createSubCategory
  )
  .get(getSubCategories);
router
  .route('/:id')
  .get(validate({ params: idParamSchema }), getSubCategoryById)
  .patch(validate({ body: updateSubCategorySchema, params: idParamSchema }), updateSubCategory)
  .delete(validate({ params: idParamSchema }), deleteSubCategory);

module.exports = router;
