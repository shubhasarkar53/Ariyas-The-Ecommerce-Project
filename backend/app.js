const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// * route import 
const productRoute = require("./routes/productRoute");

// * middleware
app.use(express.json());
app.use(cookieParser());

// * route
app.use("/api/v1",productRoute);

module.exports=app;