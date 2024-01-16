const ErrorHandler = require("../utills/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MOngoDB cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid Path :${err.path}  ${err}`;
    err = new ErrorHandler(400, message);
  }

  //Duplicate key error handle
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  // Wrong jwttoken entered
  if (err.name === "JsonWebTokenError") {
    const message = `Wrong web token entered! Try again.`;
    err = new ErrorHandler(400, message);
  }
  if (err.name === "TokeneExpiredError") {
    const message = `Expired web token entered! Try again with latest token.`;
    err = new ErrorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // tmsg: "Internal Server error",
  });
};
