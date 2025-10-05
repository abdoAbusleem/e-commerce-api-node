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
  idParamSchema,
} = require('../validators/subcategory/subcategory.schema');
const { setParamToBody } = require('../middlewares/nestedRoutes');
const validate = require('../middlewares/validatorMiddlleware');

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
