// create a schema for address  
const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      phoneNo: {
        type: Number,
        required: true
      },
      postalCode: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      default: {
        type: Boolean,
        required: true
      }
});
module.exports = mongoose.model('Address', addressSchema);