const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// * route import 
const product = require("./routes/productRoute");

// * middleware
app.use(express.json());
app.use(cookieParser());

// * route
app.use("/api/v1",product);

module.exports=app;