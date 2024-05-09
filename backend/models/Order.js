// // create a schema for orders
// const mongoose = require('mongoose');
// const orderSchema = new mongoose.Schema({
//     orderBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required:true
//       },
//     // user: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'User',
//     //     required:true
//     //   },
//       orderItems: [
//         {
//           name: {
//             type: String,
//             required: true
//           },
//           quantity: {
//             type: Number,
//             required: true
//           },
//           image: {
//             type: String,
//             required: true
//           },
//           price: {
//             type: Number,
//             required: true
//           },
//           product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//           },
//           seller:{
//             type:String,
//             require:true,
//           },
//           // productId: {
//           //   type: mongoose.Schema.Types.ObjectId,
//           //   ref: 'Product',
//           //   required: true
//           // }
//         }
//       ],
//       shippingInfo: {
//         type: Object,
//         required:true
//       },
//       paymentInfo: {
//         id: {
//           type: String
//         },
//         status: {
//           type: String
//         },
//       },
//       paidAt: {
//         type: Date
//       },
//       itemsPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//       },
//       shippingPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//       },
//       totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//       },
//       orderStatus: {
//         type: String,
//         required: true,
//         default: 'Processing'
//       },
//       deliveredAt: {
//         type: Date
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
// });
// module.exports = mongoose.model('Order', orderSchema);

// models/Order.js

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming seller is a user
});

const sellerStatusSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, required: true, default: 'processing' }
});

const orderSchema = new mongoose.Schema({
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  shippingInfo: { type: Object, required: true },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { type: String },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  sellerStatus: [sellerStatusSchema], // Track status set by each seller
  orderStatus: { type: String, required: true, default: "processing" },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// Method to update order status based on seller statuses
orderSchema.methods.updateOrderStatus = function () {
  const allShipped = this.sellerStatus.every(status => status.status === 'shipped');
  const allDelivered = this.sellerStatus.every(status => status.status === 'delivered');

  if (allDelivered) {
    this.orderStatus = 'delivered';
  } else if (allShipped) {
    this.orderStatus = 'shipped';
  } else {
    this.orderStatus = this.orderStatus;
  }
};

// Middleware to automatically update order status before saving
orderSchema.pre('save', function (next) {
  this.updateOrderStatus(); // Update order status before saving
  next();
});


// Method to update seller status
orderSchema.methods.updateSellerStatus = function(sellerId, newStatus) {
  const sellerIndex = this.sellerStatus.findIndex(status => status.seller.equals(sellerId));
  if (sellerIndex !== -1) {
      this.sellerStatus[sellerIndex].status = newStatus;
      return true; // Seller status updated successfully
  }
  return false; // Seller not found in sellerStatus array
};


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
