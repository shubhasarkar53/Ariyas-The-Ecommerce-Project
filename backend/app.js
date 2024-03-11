const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleWares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
// * route import 
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const addressRoute = require("./routes/addressRoute");
const returnRoute = require("./routes/returnRoute");
// * middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// * route
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",addressRoute);
app.use("/api/v1",returnRoute);

module.exports=app;

// Error middleware should be in last of the code
app.use(errorMiddleWare);