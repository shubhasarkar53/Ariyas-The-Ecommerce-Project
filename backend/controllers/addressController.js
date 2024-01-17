const Address =  require("../models/Address");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");


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
  await newAddress.save();

  res.status(201).json({
    success: true,
    newAddress,
  });
});

//Controller for get single address
exports.getSingleAddress = catchAsyncErr(async (req, res, next) => {
  const address = await Address.findById(req.params.id).populate(
    "user"
  );

  if (!address) {
    return next(new ErrorHandler(404, "Address not found"));
  }

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

  address = await Address.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
      success:true,
      address
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

