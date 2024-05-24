exports.generateOTP = () =>{
    let otpStr = "";
    for (let i = 1; i <=4; i++) {
      otpStr += Math.round(Math.random()*9);
    }
    return otpStr;
}