// create a user achema for ecommerce website
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
        maxlength: 50,
        validate: [validator.isEmail, "Please enter valid email address"],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be greater than 8 characters"],
        maxlength: [20, "Password should be less than 20 characters"],
        select: false   
    },
    confirmPassword:{
        type: String,
        required: true,
        maxlength: 20
    },
    phoneNumber: {
        type: String,
        required: true,
        maxlength: 10
    },
    accountType:{
        type:String,
        enum:["Admin","User","Instructor"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
      },
      orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }],
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
      },
      avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
        resetPasswordToken: String,
        resetPasswordExpires: Date,

});

module.exports = mongoose.model('User', userSchema);