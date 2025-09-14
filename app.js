const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Routes
const categoryRoute = require('./routes/category.routes');
const subCategoryRoute = require('./routes/subcategory.routes');
const brandRoute = require('./routes/brand.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);

// Handle unhandled routes
app.use((req, res, next) => {
  const err = new ApiError(`Route not found: ${req.originalUrl}`, 400);
  next(err);
});

// Global error handler
app.use(globalError);

module.exports = app;
