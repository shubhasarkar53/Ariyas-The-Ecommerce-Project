
Hello there !
This is Backend. 
This is Backend. 2


Hello there !
2

Testing
15/01/23 - user controller & routes added
16/01/23 - products controller & routes added 
17/01/2024 - User controller updated with all new features.(FT. Shubha)
18/01/24 - Address controller updated also with specific condition ✅ (FT. Shubha)
19/01/24 - create order controller and routes but some work till pending
           and create return model,routes,controller for return the product


           const Return = require('../models/Return');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErr = require('../middlewares/catchAsyncErr');

exports.createReturnRequest = catchAsyncErr(async (req, res, next) => {
    const { orderId } = req.body;

    // 1. Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
        return next(new ErrorHandler(404, 'Order not found'));
    }

    // 2. Check if the order belongs to the logged in user
    if (order.user.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler(403, 'Unauthorized'));
    }

    // 3. Check if the return request for the particular order is already placed
    const existingReturn = await Return.findOne({ orderId: order._id });
    if (existingReturn) {
        return res.status(400).json({ message: 'Return request already placed for this order' });
    }

    // 4. Check if the order is within the return window (e.g., 7 days)
    const orderDate = new Date(order.paidAt);
    const returnWindowEndDate = new Date(orderDate.setDate(orderDate.getDate() + 7));
    if (new Date() > returnWindowEndDate) {
        return next(new ErrorHandler(400, 'Return window ended for this order'));
    }

    // 5. Fetch the product creator id from the orders
    const product = await Product.findById(order.orderItems[0].product);
    const productCreatorId = product.user.toString();

    // 6. Create a return request and save in the return orders model
    const returnOrder = new Return({
        orderId: order._id,
        userId: req.user._id,
        reason: req.body.reason,
        productCreatorId,
    });

    await returnOrder.save();

    res.status(201).json({ success: true, message: 'Return request created successfully', returnOrder });
});
