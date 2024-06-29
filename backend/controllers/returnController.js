const mongoose = require("mongoose");
const Product = require("../models/Product");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const User = require("../models/User");
const Order = require("../models/Order");
const Return = require("../models/Return");

// create a controller where user can able to place a return request return there order within 7 days after it delivered
// controller for create a return request  ✌ Done
exports.createReturnRequest = catchAsyncErr(async (req, res, next)=> {

    const { orderId } = req.body;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
        return next(new ErrorHandler(401,"order not found"));
      }
      console.log(order);

    // Check if the order belongs to the logged in user
    if (order.user.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler(401,"Unauthorized"));
    }

    // Check if the return request for the particular order is already placed
    const existingReturn = await Return.findOne({ orderId: order._id });
    if (existingReturn) {
        return res.status(400).json({ message: 'Return request already placed for this order' });
    }

    // Check if the order is within the return window (e.g., 7 days)
    const orderDate = new Date(order.createdAt);
    const returnWindowEndDate = new Date(orderDate.setDate(orderDate.getDate() + 7*24*60*60*1000));
    if (new Date() > returnWindowEndDate) {
      return next(new ErrorHandler(401,"Return window ended for this order"));
    }

    // fetch the product creator id from the orders
    const product = await Product.findById(order.orderItems[0].product);
    console.log(product);
    const productCreatorId = product.user.toString();


    // Create a return request and save in the return orders model
    const returnOrder = new Return({
        orderId: order._id,
        userId: req.user._id,
        reason: req.body.reason,
        productCreatorId,
    });

    await returnOrder.save();

    res.status(201).json({ message: 'Return request created successfully', returnOrder });

  }); 

// Create a controller to handle fetching all return requests for a seller's products. ✌ Done  Not Solved Yet
exports.getAllReturnRequest = catchAsyncErr(async (req, res, next) => {
    
  // const user = await User.findById(req.user._id);
  // if (!user.role("seller")) {
  //     return next(new ErrorHandler(401,'Unauthorized'));
  // }

  // Fetch all return requests for the seller's products
  // const returnRequests = await Return.find({ productCreatorId: req.user._id });

  // res.status(200).json({ 
  //   success: true,
  //   returnRequests });
  try {
    const sellerId = req.user._id;

    //  Fetch all orders related to the seller's products
    const orders = await Order.find({ 'orderItems.product': { $in: await Product.find({ user: sellerId }).distinct('_id') } });
    console.log(orders);

    //  Extract unique product IDs from these orders
    const productIds = orders.flatMap(order => order.orderItems.map(item => item.product));

    //  Find return requests related to the seller's products
    const returnRequests = await Return.find({ productCreatorId: sellerId, orderId: { $in: productIds } });

    res.status(200).json({ success: true, returnRequests });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
}
    
});

// Create a controller to handle a single return requests for a seller's products. ✌ Done
exports.getSingleReturnRequest = catchAsyncErr(async (req, res, next) => {
    
       // fetch return req id from the parameter
        const  returnRequestId  = req.params.id;

        
        // fetch the return request from the return model
        const returnRequest = await Return.findById(returnRequestId);


        //check if the productCreatorId from return requestid same as the loggedin seller id
        if (returnRequest.productCreatorId.toString() !== req.user._id.toString()) {
          return next(new ErrorHandler(401,"Unauthorized"));
        }
    
        res.status(200).json({
          success: true,
          returnRequest,
        });
    
});

// Create a controller to change return request status ✌ Done
exports.changeReturnRequestStatus = catchAsyncErr(async (req, res, next) => {
    
  // fetch return req id from the parameter
  const  returnRequestId  = req.params.id;
  // update the return request with new field values
  const { status } = req.body;
  // fetch the return request from the return model
  const returnRequest = await Return.findById(returnRequestId);

  //check if the return request exists 
  if(!returnRequest){
    return next(new ErrorHandler(404,"Return request not found"));
  }

  //check if the productCreatorId from return requestid same as the loggedin seller id
  if (returnRequest.productCreatorId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler(401,"Unauthorized"));
  }

  

  // update the return request status
  returnRequest.status = status;
  await returnRequest.save();

  res.status(200).json({
    success: true,
    returnRequest,
  });

});

