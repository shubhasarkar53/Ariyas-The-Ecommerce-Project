const Address =  require("../models/Address");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const User = require("../models/User");


//Controller for create new address
exports.createNewAddress = catchAsyncErr(async (req, res, next) => {
  const { address,city,phoneNo,postalCode,state,country,} = req.body;

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

//Controller for get User All Address  *******
exports.getUserAllAddress = catchAsyncErr(async (req, res, next) => {

  // const address = await User.findById(req.user._id).populate(
  //   "address"
  // );

  const addresses = await Address.find();
  console.log(typeof(addresses));

  if (!addresses) {
    return next(new ErrorHandler(404, "Address not found"));
  }

  const userAddresses = addresses.filter((address)=>(req.user.id.toString() === address.user.toString()));

  console.log(typeof(userAddresses));

  res.status(200).json({
    success: true,
    userAddresses,
  });
});

//Controller for update address
exports.updateAddress = catchAsyncErr(async(req,res,next)=>{

  let add = await Address.findById(req.params.id);

  if(!add) {
      return next(new ErrorHandler(404,"Address Not Found"));
  }
  const {address, city,phoneNo,postalCode, state} = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      { address, city,phoneNo,postalCode, state},
      { new: true,runValidators:true }
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
  await Address.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
    message :"Address deleted successfully.",
  });
});

//Controller for get all address --ADMIN
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

