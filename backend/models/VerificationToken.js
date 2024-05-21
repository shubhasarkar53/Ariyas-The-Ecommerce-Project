// create a user achema for ecommerce website
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const verificationTokenSchema = new mongoose.Schema({
  owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      require:true
    },
    token:{
        type:String,
        require:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600,
        
    }

});

//for creating the token hash
verificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
    next();
  }
});

// Compare token function
verificationTokenSchema.methods.compareToken = async function (token) {
  const result =  await bcrypt.compareSync(token, this.token);
  return result;
};


module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
