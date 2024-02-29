const nodemailer = require("nodemailer");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");

exports.sendContactUsMail = catchAsyncErr(async ( options ) => {
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
  console.log(options.email);
  const info = await transporter.sendMail({
    from:options.email, // sender address
    to:process.env.SMTP_USER , // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
});
