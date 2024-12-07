// Get jwttoken and store into cookie

const sendToken = (user, statusCode, res) => {

    const token = user.generateJWTToken();
  
  //   const options = {
  //     expires: new Date(Date.now() + process.env.EXPIRE_IN * 24 * 60 * 60 * 1000),
  //     httpOnly: true,
  //     secure: true,
  // sameSite: 'None',
  // // maxAge: 24 * 60 * 60 * 1000 
  //   };

    const options = {
      httpOnly: true,
      maxAge: 1000 * 24 * 60 * 60,
      sameSite:process.env.NODE_ENV==="development"?"lax":"none",
      secure:process.env.NODE_ENV==="development"?false:true,
    };
  
    res.status(statusCode).cookie("token", token , options).json({
      success: true,
      user,
      token
    });
  
  }; 
  
  module.exports = sendToken;
  

