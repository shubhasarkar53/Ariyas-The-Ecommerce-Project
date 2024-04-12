const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const User = require("../models/User");


//controller for create new order ✌ Done
exports.createNewOrder = catchAsyncErr(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentInfo,
    paidAt,     // 🔴 need to be fixed from API  🔴
    itemsPrice,
    shippingPrice,
    totalPrice,
    deliveredAt,  // 🔴 need to be fixed from API  🔴
  } = req.body;

  // Retrieve the user
  const user = await User.findById(req.user._id)
  // console.log(user);
 // Retrieve the user's saved address 
  const userAddress = await Address.findById(user.address);
  // console.log(userAddress);

  const newOrder = await Order.create({
    orderItems,
    // shippingInfo:userAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    paymentInfo,
    // paidAt,            // 🔴 need to be fixed from API  🔴
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



//Controller for get single order  ✌ Done
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

//Controller for get logged in user orders  ✌ Done
exports.getLoggedInUserOrders = catchAsyncErr(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Controller for get all orders --Admin --Seller
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



//Controller for delete order ✌ Done
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

// create a controller for product sellers to see all incoming orders  Not Solved Yet
exports.getAllIncomingOrders = catchAsyncErr(async (req, res, next) => {

  const sellerId = req.user._id;

    // Step 1: Find orders where a product related to the current logged-in seller
    const orders = await Order.find({ seller: sellerId }).populate('product');

    // Step 2: Filter orders where the ordered product is created by the logged-in seller
    const incomingOrders = orders.filter(order => order.orderItems.product.user.toString() === sellerId);
    console.log(incomingOrders);

    // Step 3: Store all the new incoming orders in an array
    // You can modify this logic based on your requirements
    const newIncomingOrders = incomingOrders.filter(order => !order.isProcessed);


    // Send response back with status code and data
    res.status(200).json({
        success: true,
        count: newIncomingOrders.length,
        seller:req.user._id,
        incomingOrders: newIncomingOrders
    });
   

  });


// * ---------------Optional--functions------------Routes not added---------📍

// create a controller for product sellers to see all delivered orders
exports.getAllDeliveredOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({ 'orderItems.product.user': sellerId, orderStatus: 'Delivered' });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all pending orders
exports.getAllPendingOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({ 'orderItems.product.user': sellerId, orderStatus: 'Pending' });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all cancelled orders
exports.getAllCancelledOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({ 'orderItems.product.user': sellerId, orderStatus: 'Cancelled' });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all shipped orders
exports.getAllShippedOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({ 'orderItems.product.user': sellerId, orderStatus: 'Shipped' });

  res.status(200).json({
    success: true,
    orders,
  });
});


