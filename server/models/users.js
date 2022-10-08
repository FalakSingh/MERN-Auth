const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Delete the collections if you change the schema

const userSchema = new mongoose.Schema({
  fName: { type: String, lowercase: true },
  lName: { type: String, lowercase: true },
  email: { type: String, unique: true },
  password: {type: String, select:false},
  emailOtp:Number,
  resetPassToken: String,
  resetPassExpires: Date,
});

//encrypting the password before saving it
userSchema.pre("save", async function (next) {
  //isModified is a Mongoose function which checks if the field is modified or not
  if (!this.isModified("password")) {
    next();
  }
  //password encrypting middleware
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//checks if the password is same or not and returns a boolean
userSchema.methods.checkPass = async function(givenPass) {
  return await bcrypt.compare(givenPass, this.password);
}

//returns a JWT signed token for UserAuth
userSchema.methods.getSignedJwtToken = function () { 
  return jwt.sign({ id : this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
 };

 //returns a resetToken for password reset
 userSchema.methods.getResetPassToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPassToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPassExpires = Date.now() + 10 * (60 * 1000);

  return resetToken
 }

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
