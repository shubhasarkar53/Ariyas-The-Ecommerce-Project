// create a user achema for ecommerce website
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give a username"],
    minlength: 3,
    maxlength: 30,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  phone: {
    type: Number,
    required: [true, "Please give a Phone Number"],
    maxlength: 10,
  },
  dob: {
    // type:Date
    type: String, //but not proper
  },
  email: {
    type: String,
    required: [true, "Please give a email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Password should be greater than or equal to 8 charectures"],
    select: false,
  },
  avatar: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },

  verified: {
    type: Boolean,

    require: true,

    default: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

//  This function takes a next parameter, which is a function that should be called when the middleware is done. If an error occurs, you can pass the error to next, and Mongoose will stop the save operation and invoke the error handler.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});



// JWT token generation

  userSchema.methods.generateJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
  };


// Compare Password function
userSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

// Forgot Password

userSchema.methods.getResetPasswordToken = function () {
  // generate token

  // generate random token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // creating hash of that token and adding to db
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire time of token

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // return token
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
