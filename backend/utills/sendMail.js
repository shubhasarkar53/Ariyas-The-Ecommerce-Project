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

  console.log(options);
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
});
