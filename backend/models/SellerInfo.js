// create a schema for address  
const mongoose = require('mongoose');
const validateLength = (value, length) => {
  return value.toString().length === length;
};

const sellerInfoSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Please fill all the fields"],
  },
  agencyName: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
  name: {
      type: String,
      required: [true, "Please fill all the fields"],
      minlength: [3, "Name should be greater than 3 characters."],
      maxlength: [30, "Name should be within 30 characters."]
  },
  phone: {
      type: Number,
      required: [true, "Please fill all the fields"],
      validate: {
          validator: (value) => validateLength(value, 10),
          message: "Phone Number should be 10 digits."
      },
  },
  email: {
      type: String,
      required: [true, "Please fill all the fields"],
      unique: true,
  },
  aadharNumber: {
      type: Number,
      required: [true, "Please fill all the fields"],
      validate: {
          validator: (value) => validateLength(value, 12),
          message: "Aadhar Number should be 12 digits."
      },
      unique: true,
  },
  panNumber: {
      type: String,
      required: [true, "Please fill all the fields"],
      minlength: [10, "Pan Number should be 10 characters."],
      maxlength: [10, "Pan Number should be 10 characters."],
      unique: true,
  },
  pincode: {
      type: Number,
      required: [true, "Please fill all the fields"],
      validate: {
          validator: (value) => validateLength(value, 6),
          message: "Pincode should be 6 digits."
      },
  },
  postOffice: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
  policeStation: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
  address: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
  landmark: {
      type: String,
  },
  town: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
  state: {
      type: String,
      required: [true, "Please fill all the fields"],
  },
});
module.exports = mongoose.model('SellerInfo', sellerInfoSchema);