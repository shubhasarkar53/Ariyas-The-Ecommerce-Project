const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleWares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require("path");

// * config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "backend/config/config.env" });
// }

// * config
dotenv.config({ path: "backend/config/config.env" });


// * route import 
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const addressRoute = require("./routes/addressRoute");
const returnRoute = require("./routes/returnRoute");
const payment = require("./routes/paymentRoute");


// * middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// * route
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", addressRoute);
app.use("/api/v1", returnRoute);
app.use("/api/v1", payment);

// Email sending functionality
// const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   };

//   await transporter.sendMail(mailOptions);
// };


// module.exports = { app, sendEmail };
module.exports = app;

// Error middleware should be in last of the code
app.use(errorMiddleWare);