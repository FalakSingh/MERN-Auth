const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { validate } = require("../middleware/authorize");

router.route("/").get(validate, getPrivateRoute);

module.exports = router;