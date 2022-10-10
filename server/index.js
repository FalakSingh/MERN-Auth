const express = require("express");
const app = express();
const cors= require("cors");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post("/api/auth/login", (req,res) => {
  console.log(req.body);
})

app.listen(3001,()=>{console.log("Server Started")})