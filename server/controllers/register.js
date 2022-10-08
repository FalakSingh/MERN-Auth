const sendEmail = require("../utils/sendEmail");
const User = require("../models/users");
const UserContent = require("../models/userContent")



//Async function to handle request for "api/auth/register" path

const register = async (req, res, next) => {

  const { fName, lName, email, password } = req.body;

  try {
    const user = await User.create({
      fName,
      lName,
      email,
      password,
    });

    const userContent = await UserContent.create({
      _id:user._id,
    })

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    if (error.code == 79 || error.code == 11000) {
      res.status(500).json({
        success: false,
        error: "Email Already exists",
      });
    }
  }
};


module.exports = register;