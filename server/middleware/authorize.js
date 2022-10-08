const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.validate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(400).json({ error: "Not Authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(400).json({ success: false, error: "No user with this id" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Not authorized to access this route" });
  }
};
