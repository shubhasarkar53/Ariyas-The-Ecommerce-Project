const Address =  require("../models/Address");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const User = require("../models/User");


//Controller for create new address ✅✅
exports.createNewAddress = catchAsyncErr(async (req, res, next) => {
  const { town,phoneNo,postalCode,state,country,flatName,area,landmark,fullName} = req.body;

  const newAddress = new Address({
    fullName,
    // address,
    town,
    phoneNo,
    flatName,
    area,
    landmark,
    postalCode,
    country,
    state,
    user: req.user._id,
  });
  

// Save the new Address object to the Address collection (**********Problem Fixed*********)
// Now everything is ok while inserting address and deleting address
 const saveAddress = await newAddress.save();

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { address: saveAddress._id } },
    { new: true }
  );
  
  res.status(201).json({
    success: true,
    saveAddress,
  });

});


//Controller for get User's All Addresses  
exports.getUserAllAddress = catchAsyncErr(async (req, res, next) => {

  // const address = await User.findById(req.user._id).populate(
  //   "address"
  // );

  const addresses = await Address.find();
  // console.log(typeof(addresses));

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

//Controller for update address (Updated with specific condition ✅)
exports.updateAddress = catchAsyncErr(async(req,res,next)=>{

  let add = await Address.findById(req.params.id);

  if(!add) {
      return next(new ErrorHandler(404,"Address Not Found"));
  }
  // const {address, city,phoneNo,postalCode, state} = req.body;

  if (req.user.id.toString() !== add.user.toString()) {
    return next(
      new ErrorHandler(401, "You are not authorized to update this product")
    );
  }
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true,runValidators:true }
    );

  res.status(200).json({
      success:true,
      updatedAddress
  });
});

//Controller for delete address (Updated with specific condition ✅)
exports.deleteAddress = catchAsyncErr(async(req,res,next)=>{
  let address = await Address.findById(req.params.id);

  if(!address){
    return next(new ErrorHandler(404,"Address Not Found"));
  }

  if (req.user.id.toString() !== address.user.toString()) {
    return next(
      new ErrorHandler(401, "You are not authorized to update this product")
    );
  }
  await Address.findByIdAndRemove(req.params.id);

  // Remove the address ID from the corresponding user's address array(ChatGpt)
  await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { address: req.params.id } }, // Remove the address ID from the array
    { new: true }
  );

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

