const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const sendToken = require("../utills/jwtToken");
const ErrorHandler = require("../utills/errorHandler");
const { sendMail, generateEmailTemplate, generateEmailVerifiedTemplate, generateUpdateRoleEmailTemplate } = require("../utills/sendMail");
const crypto = require("crypto");
const SellerInfo = require("../models/SellerInfo");
const { sendContactUsMail } = require("../utills/sendContactUsMail");
// const cloudinary = require('cloudinary').v2;
const cloudinary = require('cloudinary');
const { generateOTP } = require("../utills/generateOTP");
const { isValidObjectId } = require("mongoose");


// Register User
exports.registerUser = catchAsyncErr(async (req, res, next) => {
  const { name, email, password , phone} = req.body;

// creating user using the data given in the body
  const user = new User({
    name: name,
    email: email,
    password: password,
    phone:phone,
    avatar: {
      publicId: "demoPublicId123",
      url: "https://res.cloudinary.com/dd3sjaumq/image/upload/v1716313695/avatars/demo_user/pngwing.com_3_i3xfrs.png",
    },
  });
//1.generate otp
  const OTP = generateOTP();
//2. Create entry into varification token DB with the OTP
  const verificationToken = new VerificationToken({
    owner:user._id,
    token:OTP
  })
  await verificationToken.save();

  //creating entry of user into User collection
  await user.save();

  //send OTP to email for verification
  try {
    await sendMail({
      email: user.email,
      subject: `Verify Your Email Account - ARIYAS`,
      html: generateEmailTemplate(OTP,user.name),
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }

  res.status(200).json({
    success: true,
    message: `Verification mail send successfully to ${user.email}`,
    user
  });
});



//Verify email OTP controller

exports.verifyEmailOTP = catchAsyncErr(async (req, res, next) => {
  const { userId,otp } = req.body;

    if(!userId || !otp.trim()){
      return next(new ErrorHandler(400, "Invalid Request, Missing Parameters!"));
    }
    if(!isValidObjectId(userId)){
      return next(new ErrorHandler(400, "User Id not valid!"));
    }
  //find the user first 
    const user = await User.findById(userId);
    if(!user){
      return next(new ErrorHandler(400, "Sorry,User not Found!"));
    }
    if(user.verified){
      return next(new ErrorHandler(400, "This user is already verified."));
    }
  // 1.compare entered otp with "VerifyToken" db's token
      const tokenEntity = await VerificationToken.findOne({owner:user._id});

      if(!tokenEntity){
        return next(new ErrorHandler(400, "Token not found!"));
      }
      const isTokenMatched = await tokenEntity.compareToken(otp)

      if(!isTokenMatched){
        return next(new ErrorHandler(400, "Please provide a valid token!"));
      }
  //2.If true then
            // 2.1 overwrite verified field of User Db with true value
            user.verified = true;
    // 2.2 Delete "VerifyToken" db's entry search using UserID
            await VerificationToken.findByIdAndDelete(tokenEntity._id);

            await user.save();

    // 2.3 Send Successfull mail
          try {
            await sendMail({
              email: user.email,
              subject: `Verification Successful - ARIYAS`,
              html: generateEmailVerifiedTemplate(user.name),
            });
          } catch (error) {
            return next(new ErrorHandler(400, error.message));
          }

      
      //   Get the token to login as soon as register

      sendToken(user, 201, res);
});

// Login  User

exports.loginUser = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);

  // check is email and password exits or not
  if (!email || !password) {
    return next(new ErrorHandler(400, "Invalid email or password!"));
  }

  const user = await User.findOne({ email: email }).select("+password"); //note

  // if such user not found with the same mail id
  if (!user) {
    return next(new ErrorHandler(400, "Invalid email or password!"));
  }

  // if found then
  const isPasswordMatched = await user.comparePassword(password); //Await is must took 2 days to debug because this function give us a promise

  // if not matched
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Invalid email or password!"));
  }

  //If matched
  sendToken(user, 200, res);
});

// Log out user

exports.logoutUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !!",
  });
});

// Forgot password

exports.forgotPassword = catchAsyncErr(async (req, res, next) => {

  const { email } = req.body;
  console.log(email);
  // find the mail id DB
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }
  const token = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });


  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  //THIS WAS THE ACCUALL CODE
  
  // old
  // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/password/reset/${token}`;

// correct
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/password/reset/${resetToken}`;


    // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅


// 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑

//THIS LINE IS FOR TEMPORARAY PURPOSE ONLY WILL WORK ON LOCAL HOST NOT IN PRODUCTION
const resetURL = `${process.env.FRONTEND_URL}/password/reset/${token}`;

// 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑


  const message = `Your password reset link is (tempp) -->\n\n${resetURL}\n\nIgnore if it was not created by you.`;

  // console.log(message);

  try {
    await sendMail({
      email: user.email,
      subject: `Password Recovery From ARIYAS`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Mail send successfully to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(400, error.message));
  }
});

// reset password
exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  // take the token from body.parms
  let resetToken = req.params.token;
  // console.log("reset token--", resetToken);
  // hash it
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // search it in db if present

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //doubt++
  });

  if (!user) {
    return next(
      new ErrorHandler(404, "Reset Token not found or token has been expired")
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(400, "Both password and confirm password should match")
    );
  }
  //if present then change old pwd with the new one
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  // save ofcourse
  await user.save();
  // sendtoken function for login immdediately
  sendToken(user, 200, res);
});


// Log out user

exports.logoutUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out !!",
  });
});

// get all users ✅
exports.getAllUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("User not availabe", 400));
  }
  res.status(200).json({
    success: true,
    users,
  });
});

//get user details✅

exports.getUserDetails = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update profile password ✅

exports.updateUserPassword = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Old password does not match."));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler(400, "Both password and confirm password should match"));
  }

  user.password = newPassword;
  await user.save(); //must have to save to see the changes
  sendToken(user,200,res);
});

// Update user's profile details 
exports.updateUserDetails = catchAsyncErr(async(req,res,next)=>{

  const userDetails = {
    name : req.body.name,
    gender: req.body.gender,
    phone: req.body.phone,
    // avatar:req.body.avatar
    // dob: req.body.dob,
  }

  // console.log("From backedn",userDetails);

  if(req.body.avatar!==""){
    const user = await User.findById(req.user.id);
    //remove old image from cloudinary
    // console.log("skipping If");
    if(user.avatar.publicId!=="demoPublicId123"){
      const imgId = user.avatar.publicId;
      await cloudinary.v2.uploader.destroy(imgId);
    }
    // console.log("skipped If");
    // console.log("Uploading to cn");
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder: "avatars",
      quality: 'auto:good',
      format: 'webp',
      resource_type:"auto",
    })
    // console.log("Uploadded to cn");
    userDetails.avatar={
      publicId:myCloud.public_id,
      url:myCloud.secure_url
    }
    // console.log("avatr obj edted with pId and Url");

  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id,userDetails,{
    new:true,
    runValidators:true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success:true,
    updatedUser
  })
});

// Update user's Role --ADMIN ✅
exports.updateUserRole = catchAsyncErr(async(req,res,next)=>{

  const userDetails = {
    role:req.body.role,
    // add more if need
  }
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(404, "User not found"));
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id,userDetails,{
    new:true,
    runValidators:true,
    // one line forgot
  })

  res.status(200).json({
    success:true,
    updatedUser
  })

  try {
    await sendMail({
      email: user.email,
      subject: `Your are Now a Verified ${req.body.role} ${user.name} - ARIYAS`,
      html: generateUpdateRoleEmailTemplate(user.name,req.body.role),
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }

})

//  Delete user --ADMIN ✅
exports.deleteUser = catchAsyncErr(async(req,res,next)=>{

  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(404, "User not found"));
  }

  const updatedUser = await User.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success:true,
    message:"User Deleted successfully."
  })
})


// Contact us
exports.contactUsMessage = catchAsyncErr(async(req,res,next)=>{

  const { firstName, lastName,phoneNumber,email,message} = req.body;

  const  mailContent = new SellerInfo ({
    firstName,
    lastName,
    phoneNumber,
    email,
    message
  });
  

  // const sellerInfo = await SellerInfo.create(infoByUser);
  // console.log(sellerInfo);
  const mail = `${firstName} ${lastName} is requesting to contact. His/her Details and query is listed below -->\n\n${mailContent}\n\n.`;

  try {
    await sendContactUsMail({
      email: email,
      subject: `Contact Us Form `,
      message: mail,
    });

    res.status(200).json({
      success: true,
      message: `Mail successfully sent to Us.`,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }

})

