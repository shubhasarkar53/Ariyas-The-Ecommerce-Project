const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleWares/error");
// * route import 
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

// * middleware
app.use(express.json());
app.use(cookieParser());

// * route
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);

module.exports=app;

// Error middleware should be in last of the code
app.use(errorMiddleWare);