const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");//configuring the env file
const connectDB = require("./config/db");

//env config
dotenv.config();

//after adding the userController in userRoutes.js, we need to import the userRoutes.js in index.js
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();//creating the express application

//middelwares 
//middleware is a function that has access to the request and response object
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));// morgan is a logger which is used to log the request and response api in the console

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Port
const PORT = process.env.PORT || 8080;//if the port is not available in the env file then it will run in the port 8080
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white);


});