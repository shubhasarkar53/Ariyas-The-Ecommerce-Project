const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleWares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

// * route import 
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const addressRoute = require("./routes/addressRoute");
const returnRoute = require("./routes/returnRoute");
const blogRoute = require("./routes/blogRoute");
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
app.use("/api/v1", blogRoute);

// ---------------------------------------------------------------------------------------------------

// Route for handling contact form submission and sending email
app.post("/api/v1/contact", async (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 587 for TLS
    secure: true, // true for 465, false for other ports
    auth: {

      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email address to receive messages
    subject: "New Message",
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending message. Please try again later." });
  }
});


// ---------------------------------------------------------------------------------------------------




// module.exports = { app, sendEmail };
module.exports = app;

// Error middleware should be in last of the code
app.use(errorMiddleWare);