const sequelize = require('./config/database');
const app = require('./app');
const dotenv = require('dotenv');
const initJobs = require('./jobs/cleanupSoftDeleted');

dotenv.config({
  path: 'config.env',
});

// Initialize jobs
initJobs();

// Connect with db
sequelize.authenticate().then(() => console.log('DB connected ✅'));

// Start server
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Handle rejection outside express
process.on('unhandledRejection', err => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down...');
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
