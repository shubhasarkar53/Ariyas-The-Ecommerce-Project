const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const User = require("../models/User");


//controller for create new order
exports.createNewOrder = catchAsyncErr(async (req, res, next) => {
  const {
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Retrieve the user
  const user = await User.findById(req.user._id)
  console.log(user);
 // Retrieve the user's saved address
  const userAddress = await Address.findById(user.address);
  console.log(userAddress);

  const newOrder = await Order.create({
    orderItems,
    shippingInfo:userAddress,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    user: user,
  });

  if (!newOrder || !userAddress) {
    return next(new ErrorHandler(404, "Order not created"));
  }

  res.status(200).json({
    success: true,
    newOrder,
  });
});



//! Try to create a controller for taking new orders and simulteniously update product schema or product 
// !data work in progress but face some errors if you want to see this code navigate to dev.txt file in backend folder



//Controller for get single order
exports.getSingleOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user"," name email"
  );

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Controller for get logged in user orders
exports.getLoggedInUserOrders = catchAsyncErr(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Controller for get all orders --Admin
exports.getAllOrders = catchAsyncErr(async (req, res, next) => {  
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Controller for update order status
exports.updateOrderStatus = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });


  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered"){ 
   order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity){
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({
    validateBeforeSave: false,
  });
}



//Controller for delete order
exports.deleteOrder = catchAsyncErr(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

  order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

//controller for cancel order by user 
exports.cancelOrder = catchAsyncErr(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }

   // Check if the order has been shipped
   if (order.orderStatus === 'Shipped') {
    return res.status(400).json({ message: 'This order has already been shipped and cannot be cancelled' });
  }

  order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

//Controller for update stock
exports.updateStock = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found"));
  }
  //Get all products in this order
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  res.status(200).json({
    success: true,
  });
});


