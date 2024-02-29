// Get jwttoken and store into cookie

const sendToken = (user, statusCode, res) => {

    const token = user.generateJWTToken();
  
    const options = {
      expires: new Date(Date.now() + process.env.EXPIRE_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token , options).json({
      success: true,
      user,
      token
    });
  
  }; 
  
  module.exports = sendToken;
  