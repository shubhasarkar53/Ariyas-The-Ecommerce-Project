// create a schema for address  
const mongoose = require('mongoose');
const sellerInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, "Please fill all the fields"],
      },
      shopName: {
        type: String,
        required:[true, "Please fill all the fields"],
      },
      dob: {
        type: Date,
        required:[true, "Please fill all the fields"],
      },
      firstName: {
        type: String,
        required:[true, "Please fill all the fields"],
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required:[true, "Please fill all the fields"],
      },
      phoneNumber: {
        type: Number,
        required:[true, "Please fill all the fields"],
      },
      email:{
          type: String,
          required:[true, "Please fill all the fields"],
      },
      addharNumber: {
          type: Number,
          required:[true, "Please fill all the fields"],
      },
      addharImg: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      PAN: {
          type: String,
          required:[true, "Please fill all the fields"],
      },
      PANImg: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      pincode:{
        type: Number,
        required:[true, "Please fill all the fields"],
      },
      postOffice:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      policeStation:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      flat:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      area:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      landmark:{
        type: String,
      },
      city:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      state:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      addressProof: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      bankDetails: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      GSTCertificate: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      country: {
        type: String,
        required:[true, "Please fill all the fields"],
        default:"IN"
      },
});
module.exports = mongoose.model('SellerInfo', sellerInfoSchema);