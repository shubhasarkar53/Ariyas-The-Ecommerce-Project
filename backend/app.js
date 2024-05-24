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


// ${Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n')}

app.post("/api/v1/confirm-seller", async (req, res) => {
  const { formData } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_USER,
    to: formData.email,
    subject: "Seller Form Submission Confirmation",
    text: `
      Hello ${formData.firstName},

      Your seller form has been submitted successfully. Here are the details that you provided:

      <h2>New Seller Registration Details</h2>
      <p><strong>Shop Name:</strong> ${formData.shopName}</p>
      <p><strong>Date of Birth:</strong> ${formData.dob}</p>
      <p><strong>First Name:</strong> ${formData.firstName}</p>
      <p><strong>Last Name:</strong> ${formData.lastName}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Aadhar:</strong> ${formData.aadhar}</p>
      <p><strong>Pan:</strong> ${formData.pan}</p>
      <p><strong>Pin code:</strong> ${formData.pinCode}</p>
      <p><strong>Post Office:</strong> ${formData.postOffice}</p>
      <p><strong>Police Station:</strong> ${formData.policeStation}</p>
      <p><strong>House Details:</strong> ${formData.houseDet}</p>
      <p><strong>Address:</strong> ${formData.houseAddress}</p>
      <p><strong>Town Address:</strong> ${formData.townAdd}</p>

      We are delighted to inform you that your registration as a seller with Ariyas has been successfully received and processed. On behalf of our entire team, I would like to extend a warm welcome to you.

Your decision to join our platform as a seller is a testament to your entrepreneurial spirit and commitment to excellence. We recognize the trust you have placed in us, and we are dedicated to supporting you in every way possible as you embark on this exciting journey.

As a seller on Ariyas, you will gain access to a wide range of tools, resources, and opportunities designed to help you succeed in the dynamic world of e-commerce. Whether you are an experienced seller or just starting, we are here to empower you with the tools and guidance you need to thrive.

Please take a moment to familiarize yourself with the features of our platform and explore the various ways in which you can maximize your presence and reach on our website. Our team is available to assist you with any questions or concerns you may have along the way.

We are confident that your products and services will enrich our marketplace and enhance the shopping experience for our customers. Your dedication to quality and customer satisfaction aligns perfectly with our values, and we are excited to collaborate with you to achieve mutual success.

Once again, thank you for choosing Ariyas as your preferred platform for selling online. We look forward to building a strong and prosperous partnership with you.

We will get back to you after we have fulfilled with the documentation process. You will receive the email for the successful certification as a seller within 3-5 business days.

We will get to you shortly!

      Thank you!
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending confirmation email. Please try again later." });
  }
});

app.post('/api/v1/send-email', (req, res) => {
  const formData = req.body;

  if (!formData || !formData.email || !formData.message) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.AUTH_USER, // Your email username
      pass: process.env.AUTH_PASSWORD, // Your email password
    },
  });

  // Email options
  let mailOptions = {
    from: process.env.AUTH_USER, // Sender address
    to: process.env.EMAIL_USER, // List of receivers
    subject: 'New Seller Registration', // Subject line
    html: `
      <h2>New Seller Registration Details</h2>
      <p><strong>Shop Name:</strong> ${formData.shopName}</p>
      <p><strong>Date of Birth:</strong> ${formData.dob}</p>
      <p><strong>First Name:</strong> ${formData.firstName}</p>
      <p><strong>Last Name:</strong> ${formData.lastName}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Aadhar:</strong> ${formData.aadhar}</p>
      <p><strong>Pan:</strong> ${formData.pan}</p>
      <p><strong>Pin code:</strong> ${formData.pinCode}</p>
      <p><strong>Post Office:</strong> ${formData.postOffice}</p>
      <p><strong>Police Station:</strong> ${formData.policeStation}</p>
      <p><strong>House Details:</strong> ${formData.houseDet}</p>
      <p><strong>Address:</strong> ${formData.houseAddress}</p>
      <p><strong>Town Address:</strong> ${formData.townAdd}</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

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


// module.exports = { app, sendEmail };
module.exports = app;

// Error middleware should be in last of the code
app.use(errorMiddleWare);