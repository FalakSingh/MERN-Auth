const User = require("../models/users");

const register = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;
  try {
    const user = await User.create({
      fName,
      lName,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code == 79) {
      res.status(500).json({
        success: false,
        error: "Email Already exists",
      });
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      res.status(401).json({
        sucess: false,
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
    return(
    res.status(500).json({
      success: false,
      error: error.message,
    })
    )
  }
};
const forgotPass = (req, res, next) => {
  res.send("forgotPass");
};
const resetPass = (req, res, next) => {
  res.send("reset pass");
};


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token: token });
};


module.exports = { register, login, forgotPass, resetPass };

