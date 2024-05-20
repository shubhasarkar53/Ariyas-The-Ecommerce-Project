const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");

// Middleware to check if the user is authenticated or not
exports.isAuthenticated = catchAsyncErr(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(

      new ErrorHandler(401, "You are logged out , Please log in.")
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  req.user = user;
  next();
});

// Middleware to check if the user is authorized to access the route
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



