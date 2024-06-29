const nodemailer = require("nodemailer");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");

exports.sellerRegSendMail = catchAsyncErr(async ( options ) => {
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
    to: process.env.SMTP_USER, // Admin email
    from: options.email, // sellers email
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html, // html body
    attachments:options.attachments //attachments
  });
});
