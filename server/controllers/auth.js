const User = require("../models/users");
const UserContent = require("../models/userContent");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const register = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;


  try {
    const user = await User.create({
      fName,
      lName,
      email,
      password,
    });

    await UserContent.create({
      _id: user._id,
    });

    res.status(201).json({
      success: true,
      data: "Account Created",
    });
  } catch (error) {
    if (error.code == 79 || error.code == 11000) {
      res.status(500).json({
        success: false,
        error: "Please try again, Email already exists",
      });
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    const isMatch = await user.checkPass(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);

    // return(
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // })
    // )
  }
};

const forgotPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }
    const resetToken = user.getResetPassToken();

    await user.save();

    const resetUrl = `http://localhost:3001/resetPass/${resetToken}`;

    try {
      sendEmail({
        to: user.email,
        subject: "reset password link",
        text: resetUrl,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPassToken = undefined;
      user.resetPassExpires = undefined;

      await user.save();
      res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};
const resetPass = async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetToken,
      resetPassExpires: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid Reset Token",
      });
    }

    (user.password = req.body.password),
      (user.resetPassToken = undefined),
      (user.resetPassExpires = undefined),
      await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong Please Try Again",
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token: token });
};

module.exports = { register, login, forgotPass, resetPass };
