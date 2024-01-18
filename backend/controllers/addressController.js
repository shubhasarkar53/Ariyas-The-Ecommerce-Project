const Address =  require("../models/Address");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const User = require("../models/User");


//Controller for create new address
exports.createNewAddress = catchAsyncErr(async (req, res, next) => {
  const {
    address,
    city,
    phoneNo,
    postalCode,
    state,
    country,
  } = req.body;

  const newAddress = new Address({
    address,
    city,
    phoneNo,
    postalCode,
    state,
    country,
    user: req.user._id,
  });
  
// Save the new Address object to the Address collection
 const saveAddress = await newAddress.save();
  console.log(saveAddress);
// Push the _id of the new Address object to the address array of the corresponding User object
const updatedUser = await User.findByIdAndUpdate(
  req.user._id,
  { $push: { address: saveAddress._id } },
  { new: true }
);
console.log(updatedUser);

  res.status(201).json({
    success: true,
    updatedUser,
  });
});

//Controller for get single address
exports.getSingleAddress = catchAsyncErr(async (req, res, next) => {
  const address = await User.findById(req.user._id).populate(
    "address"
  );

  if (!address) {
    return next(new ErrorHandler(404, "Address not found"));
  }
  console.log(address);

  res.status(200).json({
    success: true,
    address,
  });
});

//Controller for update address
exports.updateAddress = catchAsyncErr(async(req,res,next)=>{

  let address = await Address.findById(req.params.id);

  if(!address) {
      return next(new ErrorHandler(404,"Address Not Found"));
  }

  // address = await Address.findByIdAndUpdate(req.params.id,req.body,{
  //   new:true,
  //   runValidators:true,
  //   useFindAndModify:false
  // });
  
  // Find the Address object with the corresponding _id and update its fields
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: req.params.id },
      { address, city,phoneNo,postalCode, state},
      { new: true }
    );

  res.status(200).json({
      success:true,
      updatedAddress
  });
});

//Controller for delete address
exports.deleteAddress = catchAsyncErr(async(req,res,next)=>{
  let address = await Address.findById(req.params.id);

  if(!address){
    return next(new ErrorHandler(404,"Address Not Found"));
  }
  address = await Address.findByIdAndRemove(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    address,
  });
});

//Controller for get all address
exports.getAllAddress = catchAsyncErr(async(req,res,next)=>{
  const address = await Address.find();
  if(!address){
    return next(new ErrorHandler(404,"Address Not Found"));
  }
  res.status(200).json({
    success: true,
    address,
  });
});

