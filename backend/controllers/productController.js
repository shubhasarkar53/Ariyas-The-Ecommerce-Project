const mongoose = require("mongoose");
const Product = require("../models/Product");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");

// Get all products
exports.getAllProducts = catchAsyncErr(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// create new product

exports.createNewProducts = catchAsyncErr(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(200).json({
      status: "success",
      message: "product created successfully",
      product,
    });
});

