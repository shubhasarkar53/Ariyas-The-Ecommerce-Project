const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = catchAsyncErr(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(401, "Something went wrong! Please log in first.")
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  req.user = user;
  next();
});

exports.authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          400,
          `ROLE: ${req.user.role} is not allowed to see this resource`
        )
      );
    }

    next();
  };
};
