const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const User = require("../models/User");
const sendToken = require("../utills/jwtToken");
const ErrorHandler = require("../utills/errorHandler");
const { sendMail } = require("../utills/sendMail");
const crypto = require("crypto");

// Register User

exports.registerUser = catchAsyncErr(async (req, res, next) => {
  const { name, email, password } = req.body;

// creating user using the data given in the body

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      publicId: "demoPublicId123",
      url: "Demourl.com",
    },
  });

  //   Get the token to login as soon as register

  sendToken(user, 201, res);

  // const token = user.generateJWTToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

// Login  User

exports.loginUser = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  // check is email and password exits or not
  if (!email || !password) {
    return next(new ErrorHandler(400, "Invalid email or password! 1"));
  }

  const user = await User.findOne({ email: email }).select("+password"); //note

  // if such user not found with the same mail id
  if (!user) {
    return next(new ErrorHandler(400, "Invalid email or password! 2"));
  }

  // if found then
  const isPasswordMatched = await user.comparePassword(password); //Await is must took 2 days to debug because this function give us a promise

  // if not matched
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Invalid email or password! 3 "));
  }

  //If matched
  sendToken(user, 200, res);

  // const token = user.generateJWTToken();

  // res.status(200).json({
  //   success: true,
  //   msg: "login succesfull",
  //   token,
  // });
});

// Log out user

exports.logoutUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !!",
  });
});

// Forgot password

exports.forgotPassword = catchAsyncErr(async (req, res, next) => {
  const { email } = req.body;
  // find the mail id DB
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }
  const token = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${token}`;

  const message = `Your password reset link is -->\n\n${resetURL}\n\nIgnore if it was not created by you.`;

  console.log(message);

  try {
    await sendMail({
      email: user.email,
      subject: `Password Recovery From ARIYAS`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Mail send successfully to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(400, error.message));
  }
});

// reset password
exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  // take the token from body.parms
  let resetToken = req.params.token;
  console.log("reset token--", resetToken);
  // hash it
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // search it in db if present

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //doubt++
  });

  if (!user) {
    return next(
      new ErrorHandler(404, "Reset Token not found or token has been expired")
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(400, "Both password and confirm password should match")
    );
  }
  //if present then change old pwd with the new one
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  // save ofcourse
  await user.save();
  // sendtoken function for login immdediately
  sendToken(user, 200, res);
});


// Log out user

exports.logoutUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !!",
  });
});
