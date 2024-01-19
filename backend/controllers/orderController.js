const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");


//Controller for create new order
exports.createNewOrder = catchAsyncErr(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  //fetch user address
  const userAddress = await Address.findById({user:req.user._id});

  const order = await Order.create({
    user:req.user._id, 
    orderItems,
    shippingInfo:userAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  if (!order || !userAddress) {
    return next(new ErrorHandler(404, "Order not created"));
  }
  res.status(201).json({
    success: true,
    order,
  });
});

//Controller for get single order
exports.getSingleOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user shippingInfo"
  );

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});