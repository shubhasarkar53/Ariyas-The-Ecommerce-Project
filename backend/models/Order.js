// create a schema for orders 
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
      },
      orderItems: [
        {
          name: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          image: {
            type: String,
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          }
        }
      ],
      shippingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required:true
      },
      paymentInfo: {
        id: {
          type: String
        },
        status: {
          type: String
        },
      },
      paidAt: {
        type: Date
      },
      itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
      },
      deliveredAt: {
        type: Date
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});
module.exports = mongoose.model('Order', orderSchema);