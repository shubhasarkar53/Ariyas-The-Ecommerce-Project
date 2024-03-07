const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleWares/error");
const nodemailer = require('nodemailer');
// * route import 
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const addressRoute = require("./routes/addressRoute");
const returnRoute = require("./routes/returnRoute");
// * middleware
app.use(express.json());
app.use(cookieParser());

// * route
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", addressRoute);
app.use("/api/v1", returnRoute);

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