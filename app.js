const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({
  path: "config.env"
});
const cors = require('cors');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoutes");



//Connect with db
dbConnection();


//express app
const app = express();
 
app.use(express.json());

app.use(cors());

if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
} 


 
//Mount Routes
app.use("/api/v1/categories", categoryRoute); 



//handle unhandled routes
app.use((req, res, next) => {
  const err = new ApiError(`Route not found: ${req.originalUrl}`, 400);
  next(err);
});

//global error handling middleware for operational errors
app.use(globalError)


//server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => { 
  console.log(`app is running on port ${port}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});