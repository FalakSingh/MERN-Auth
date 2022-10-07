const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fName: { type: String, lowercase: true },
  lName: { type: String, lowercase: true },
  email: { type: String, unique: true },
  password: {type: String, select:false},
  restPassToken: String,
  restPassExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPass = async function(givenPass) {
  return await bcrypt.compare(givenPass, this.password);
}

userSchema.methods.getSignedJwtToken = function () { 
  return jwt.sign({ id : this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
 };

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
