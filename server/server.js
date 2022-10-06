require("dotenv").config()
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json())


app.get("/register", (req,res) => {
  res.send("hello")
})

app.post("/login", (req,res) => {
  console.log(req.body);
  res.status(201).send("recieved");
})
app.post("/register", (req, res) => {
  console.log(req.body);
  res.status(201).send("recieved");
})

// const saltRounds = 10;
// const plainPass = "password";

// bcrypt.hash(plainPass, saltRounds, function(err, hash) {
//   if(!err) {
//     console.log(hash);
//    } else {
//     console.log(err);
//    }

// });


// const hash = "$2b$10$KUDoD32zmwl/ijlm4Zzwx.60pNTI8iG.DycLDemY4LwSIotvax2CO"

// bcrypt.compare(plainPass, hash, function(err, result) {
//   if (!err) {
//     console.log(result);
//   } else {
//     console.log(err);
//   }

// });





app.listen(PORT, () => {
  console.log("Server up and running on Port 3001")
})

