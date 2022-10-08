const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name:String,
})

const journalSchema = new mongoose.Schema({
  title: String,
  content: String,
})

const noteSchema = new mongoose.Schema({
  title:String,
  note:String,
})

const UserContentSchema = new mongoose.Schema({

  _id: {
    type:String,
    required: true,
  },

  todo:[todoSchema],
  journal:[journalSchema],
  notes:[noteSchema],
})



UserContent = mongoose.model("userContent", UserContentSchema, "userContent")