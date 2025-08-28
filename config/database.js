const mongoose = require("mongoose");


const dbConnection = ()=>{
//connect to db
mongoose.connect(process.env.DB_URL)
.then((conn) => console.log(`db connected: ${conn.connection.host}`))
};

module.exports = dbConnection;