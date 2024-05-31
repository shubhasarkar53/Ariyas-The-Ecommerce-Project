const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const ErrorHandler = require("../utills/errorHandler");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const User = require("../models/User");
const { sendMail, generateOrderSuccesEmailTemplate } = require("../utills/sendMail");

//controller for create new order ✌ Done


// Controller to create a new order (Ft.Shubha)

exports.createNewOrder = catchAsyncErr(async (req, res, next) => {
  const {
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    paymentInfo,
    paidAt,
  } = req.body;

  // Retrieve the user
  const userId = await User.findById(req.user._id);
  // console.log(user);

  // Create sellerStatus objects for each seller
  const sellerStatuses = orderItems.map((item) => ({
    seller: item.seller,
    status: "processing", // Default status set to 'processing'
  }));

  const createdOrder = new Order({
    orderBy: userId,
    orderItems: orderItems.map((item) => ({
      ...item,
      seller: item.seller,
    })),
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    paymentInfo,
    paidAt,
    sellerStatus: sellerStatuses,
  });
  const newOrder = await createdOrder.save();


  try {
    await sendMail({
      email: req.user.email,
      subject: `Order Successful - ARIYAS`,
      html: generateOrderSuccesEmailTemplate(req.user.name,newOrder),
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }


  res.status(200).json({
    success: true,
    newOrder,
  });
});



// Controller to update order status for a seller (ft.Shubha)
exports.updateOrderStatusForSeller = catchAsyncErr(async (req, res, next) => {
  const orderId = req.params.id;
  const { sellerId, newStatus } = req.body;

  console.log(orderId,sellerId,newStatus);
  // Find the order by orderId
  const order = await Order.findById(orderId);

  // If order not found, return error
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

    // for later--------------------------
          // order.orderItems.forEach(async (item) => {
            //   await updateStock(item.product, item.quantity);
            // });
            
            // order.orderStatus = req.body.status;
    // for later-------------------------


  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }


  // Update the seller status
  const statusUpdated = order.updateSellerStatus(sellerId, newStatus);

  // If seller status updated successfully, save the order
  if (statusUpdated) {
    await order.save();
    return res
      .status(200)
      .json({ 
        success:true,
        message: "Order status updated successfully" });
  } else {
    return res.status(404).json({ message: "Seller not found in order" });
  }
});


// controller for product sellers to see all incoming orders (Ft.Shubha)
exports.getAllIncomingOrders = catchAsyncErr(async (req, res, next) => {
  const userId = req.user._id;
  let incomingOrders;

  // If the user is an admin, fetch all incoming orders
  if (userId === "admin") {
    incomingOrders = await Order.find({});
  } else {
    // Otherwise, fetch incoming orders for the specific seller
    incomingOrders = await Order.find({ "orderItems.seller": userId });
  }

  // Send response back with status code and data
  res.status(200).json({
    success: true,
    incomingOrders: incomingOrders,
  });
});




//! Try to create a controller for taking new orders and simulteniously update product schema or product
// !data work in progress but face some errors if you want to see this code navigate to dev.txt file in backend folder

//Controller for get single order  ✌ Done
exports.getSingleOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
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
  const orders = await Order.find({ orderBy: req.user._id });

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
// exports.updateOrderStatus = catchAsyncErr(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler(404, "Order not found"));
//   }

//   if (order.orderStatus === "Delivered") {
//     return next(new ErrorHandler(400, "You have already delivered this order"));
//   }

//   order.orderItems.forEach(async (item) => {
//     await updateStock(item.product, item.quantity);
//   });

//   order.orderStatus = req.body.status;

//   if (req.body.status === "Delivered") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({
//     validateBeforeSave: false,
//   });

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

        // =============don't delete me=====================
        async function updateStock(id, quantity) {
          const product = await Product.findById(id);
          
          product.stock = product.stock - quantity;
          
          await product.save({
            validateBeforeSave: false,
          });
        }
        // =============don't delete me=====================

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
  if (order.orderStatus === "Shipped") {
    return res
      .status(400)
      .json({
        message: "This order has already been shipped and cannot be cancelled",
      });
  }

  order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order Canceled successfully",
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


// exports.getAllIncomingOrders = catchAsyncErr(async (req, res, next) => {

//   const sellerId = req.user._id;
//   // console.log(sellerId);
//     // Step 1: Find orders where a product related to the current logged-in seller
//     // const orders = await Order.find({ seller: sellerId }).populate('product');
//     // const orders = await Order.find();
//     // console.log(orders.filter( (order) => order.orderItems.filter(item => item.seller === sellerId)));

//     const orders = await Order.find({ 'orderItems.seller': sellerId }).populate('orderItems.seller');

//     const orderItems = orders.map((order)=>(order.orderItems));

//     const incomingOrders = orderItems.map((orderItem)=>(orderItem.filter(item=>(item.seller.toString() === sellerId.toString()))))
//     // const sellerOrders=orders.filter( (order) => order.orderItems);

//     // Step 2: Filter orders where the ordered product is created by the logged-in seller
//     // const incomingOrders = orders.filter(order => order.orderItems.product.user.toString() === sellerId);
//     console.log(orders);

//     // Step 3: Store all the new incoming orders in an array
//     // You can modify this logic based on your requirements
//     // const newIncomingOrders = incomingOrders.filter(order => !order.isProcessed);

//     // Send response back with status code and data
//     res.status(200).json({
//         success: true,
//         orders:orders,
//         orderItems,
//         // count: sellerOrders.length,
//         // // seller:req.user._id,
//         incomingOrders: incomingOrders,
//     });

//   });

// * ---------------Optional--functions------------Routes not added---------📍

// create a controller for product sellers to see all delivered orders
exports.getAllDeliveredOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({
    "orderItems.product.user": sellerId,
    orderStatus: "Delivered",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all pending orders
exports.getAllPendingOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({
    "orderItems.product.user": sellerId,
    orderStatus: "Pending",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all cancelled orders
exports.getAllCancelledOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({
    "orderItems.product.user": sellerId,
    orderStatus: "Cancelled",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// create a controller for product sellers to see all shipped orders
exports.getAllShippedOrders = catchAsyncErr(async (req, res, next) => {
  const { sellerId } = req.params;
  const orders = await Order.find({
    "orderItems.product.user": sellerId,
    orderStatus: "Shipped",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});
