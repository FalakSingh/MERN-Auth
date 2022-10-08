const User = require("../models/users");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const emailVerify = async (req, res, next) => {
  const { email } = req.body;
  try {
    // 6 Digit random number for OTP.
    const otp = Math.floor(100000 + Math.random() * 900000);
    //sends otp to the given email.
     sendEmail({
      to: email,
      Subject: "Email Verification Message",
      text: `OTP for Verification: ${otp}`,
     });

    // saving the otp in users collection.
    const user = await User.create({
      emailOtp: otp,
    });
    
    const idToken = user.getSignedJwtToken();
    res.status(200).json({
      success:true,
      idToken: idToken,

    })
    
    next();
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = emailVerify;
