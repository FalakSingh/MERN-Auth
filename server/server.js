require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

mongoose.connect(DB_URL).then( () => {
  app.listen(PORT, () => {
    console.log(`MongoDB connection establish \nServer up and running on PORT:${PORT}`);
  })}
).catch((error) => {
  console.log(error);
});





// bcrypt.compare(plainPass, hash, function(err, result) {
//   if (!err) {
//     console.log(result);
//   } else {
//     console.log(err);
//   }

// });
