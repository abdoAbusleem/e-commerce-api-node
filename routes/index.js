const express = require('express');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const brandRoutes = require('./brand.routes');
const subcategoryRoutes = require('./subcategory.routes');

const router = express.Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/subcategories', subcategoryRoutes);

module.exports = router;
