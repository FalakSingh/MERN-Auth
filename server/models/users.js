const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

