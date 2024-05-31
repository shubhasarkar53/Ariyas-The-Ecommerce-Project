const nodemailer = require("nodemailer");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");

exports.sendMail = catchAsyncErr(async ( options ) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // console.log(options);
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html, // html body
    attachments:options.attachments //attachments
  });
});


exports.generateOrderSuccesEmailTemplate = (name, order) => {
  const generateOrderItems = (items) => {
    return items
      .map(
        (item) => `
        <div class="product-card">
          <img src="${item.image}" alt="${item.name}" class="product-image">
          <div class="product-details">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
          </div>
        </div>
      `
      )
      .join("");
  };

  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Success - ARIYAS</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .content {
      padding: 20px;
    }

    h1 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
      margin: 10px 0;
    }

    .product-card {
      display: flex;
      align-items: center;
      margin: 15px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
    }

    .product-image {
      height: 60px;
      width: 60px;
      object-fit: cover;
      margin-right: 15px;
      border-radius: 5px;
    }

    .product-details {
      flex: 1;
    }

    .product-details h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .product-details p {
      margin: 5px 0;
      font-size: 14px;
      color: #555;
    }

    .footer {
      text-align: center;
      padding: 10px;
      color: #aaa;
      border-top: 1px solid #ddd;
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <header class="header">
      <h1>Order Successful, ${name}!</h1>
    </header>

    <div class="content">
      <p>We're thrilled to welcome you to the amazing world of ARIYAS! Explore everything we have to offer.</p>
      <p>Your Ordered Items:</p>
      ${generateOrderItems(order.orderItems)}
      <br>
      <p>Total Price: $${order.totalPrice}</p>
    </div>

    <footer class="footer">
      <p>The ARIYAS Team</p>
    </footer>
  </div>
</body>

</html>
  `;
};

exports.generateEmailTemplate = (number,name) =>{
  // return`<h1>${number}</h1>`
  return`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - ARIYAS</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .content {
      padding: 20px;
    }

    h1,
    p {
      margin: 0;
    }

    h1 {
      font-size: 20px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
    }

    .footer {
      text-align: center;
      padding: 10px;
      color: #aaa;
    }
  </style>
</head>

<body>
  <div class="container">
    <header class="header">
      <h1>Welcome to ARIYAS, ${name}!</h1>
    </header>

    <div class="content">
      <p>We're thrilled to welcome you to the amazing world of ARIYAS! There's just one small step before
        you can dive in and explore everything we have to offer.</p>
      <p>To ensure a smooth and secure experience, please verify your email address using this OTP below:</p>
      <h1>${number}</h1>
      <br>
      <p>We can't wait for you to join the ARIYAS community!</p>

    </div>

    <footer class="footer">
      <p>The ARIYAS Team</p>
    </footer>
  </div>
</body>

</html>
  `;

}
exports.generateEmailVerifiedTemplate = (name) =>{
  return`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified Successfully</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .content {
      padding: 20px;
    }

    h1,
    p {
      margin: 0;
    }

    h1 {
      font-size: 20px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
    }

    .footer {
      text-align: center;
      padding: 10px;
      color: #aaa;
    }
  </style>
</head>

<body>
  <div class="container">
    <header class="header">
      <h1> Your Email is now Verified,Welcome to ARIYAS, ${name}!</h1>
    </header>

    <div class="content">
      <p>We're thrilled to welcome you to the amazing world of ARIYAS! Please Login to explore.</p>

    </div>

    <footer class="footer">
      <p>The ARIYAS Team</p>
    </footer>
  </div>
</body>

</html>
  `;

}

//update rol template
exports.generateUpdateRoleEmailTemplate = (name,role) =>{
  // return`<h1>${number}</h1>`
  return`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Role is Changed ${name} - ARIYAS</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
    }

    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .content {
      padding: 20px;
    }

    h1,
    p {
      margin: 0;
    }

    h1 {
      font-size: 20px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
    }

    .footer {
      text-align: center;
      padding: 10px;
      color: #aaa;
    }
  </style>
</head>

<body>
  <div class="container">
    <header class="header">
      <h1>Welcome to ARIYAS, ${name}!</h1>
    </header>

    <div class="content">
      <p>We're thrilled to welcome you to the amazing world of ARIYAS!
      <h1>Congratulatons ${name} you are a ${role} now.</h1>
      <br>
      <p>We are happy for you to join the ARIYAS community!</p>

    </div>

    <footer class="footer">
      <p>The ARIYAS Team</p>
    </footer>
  </div>
</body>

</html>
  `;

}
