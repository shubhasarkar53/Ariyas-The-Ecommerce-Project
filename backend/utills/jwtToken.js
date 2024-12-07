// Get jwttoken and store into cookie

const sendToken = (user, statusCode, res) => {

    const token = user.generateJWTToken();
  
    // const options = {
    //   expires: new Date(Date.now() + process.env.EXPIRE_IN * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //     secure: true, // Ensure this is true if your site is running over HTTPS
    //     sameSite: 'None' // This allows cross-site cookies

    // };
    const options = {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true,

    };

    // res
    // .cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 15 * 60 * 1000,
    //   sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    //   secure:process.env.NODE_ENV==="Development"?false:true,
    // })

  
    res.status(statusCode).cookie("token", token , options).json({
      success: true,
      user,
      token
    });
  
  }; 
  
  module.exports = sendToken;
  