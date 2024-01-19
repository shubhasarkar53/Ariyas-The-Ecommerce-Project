const mongoose = require("mongoose");
const Product = require("../models/Product");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const apiFeatures = require("../utills/apifeatures");
const User = require("../models/User");
const Order = require("../models/Order");
const Return = require("../models/Return");

// create a controller where user can able to place a return request return there order within 7 days after it delivered
// controller for create a return request
exports.createReturnRequest = catchAsyncErr(async (req, res, next)=> {

    // get the logged in user from req object
    const user = req.user._id;
    // get the order id and reason from req.body
      const { orderId, reason } = req.body;
  
      // Check if the order exists
      const order = await Order.findById(orderId);
      if (!order) {
        return next(new ErrorHandler(404, 'Order not found'));
      }
  
      // Check if the order is within the return window (e.g., 7 days)
      const returnWindowInDays = 7;
      const currentDate = new Date();
      const deliveryDate = order.deliveredAt || order.createdAt; 
      const daysSinceDelivery = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60 * 24));
  
      if (daysSinceDelivery > returnWindowInDays) {
        return next(new ErrorHandler(400, 'Return window has expired'));
      }
  
      // Create a return request

      const returnRequest = new Return({
        orderId,
        userId: user, // Assuming user ID is available in req.user
        reason,
      });
  
      await returnRequest.save();
  
      res.status(200).json({
        success: true,
        message: 'Return request created successfully',
      });
  }); 

// Create a controller to handle fetching all return requests for a seller's products.
exports.getAllReturnRequest = catchAsyncErr(async (req, res, next) => {
    
        const { sellerId } = req.params;
    
        // Find products associated with the seller
        const sellerProducts = await Product.find({ seller: sellerId });
    
        // Extract product IDs from seller's products
        const productIds = sellerProducts.map((product) => product._id);
    
        // Find return requests for the seller's products
        const returnRequests = await Return.find({ orderId: { $in: productIds } }).populate('orderId');
    
        res.status(200).json({
          success: true,
          returnRequests,
        });
    
});

// Create a controller to handle a single return requests for a seller's products.
exports.getSingleReturnRequest = catchAsyncErr(async (req, res, next) => {
    
        const { sellerId, returnRequestId } = req.params;
    
        // Find products associated with the seller
        const sellerProducts = await Product.find({ seller: sellerId });
    
        // Extract product IDs from seller's products
        const productIds = sellerProducts.map((product) => product._id);
    
        // Find return requests for the seller's products
        const returnRequest = await Return.findOne({ orderId: { $in: productIds }, _id: returnRequestId }).populate('orderId');
    
        res.status(200).json({
          success: true,
          returnRequest,
        });
    
});


