// model for return product 
const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Possible statuses: 'Pending', 'Approved', 'Rejected'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Return = mongoose.model('Return', returnSchema);

module.exports = Return;
