const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const ApiError = require('./utils');
const { globalError } = require('./middlewares');
const { HTTP_STATUS } = require('./constants');

// Routes
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1', routes);

// Handle unhandled routes
app.use((req, res, next) => {
  const err = new ApiError(`Route not found: ${req.originalUrl}`, HTTP_STATUS.NOT_FOUND);
  next(err);
});

// Global error handler
app.use(globalError);

module.exports = app;
