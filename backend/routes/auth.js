const express = require("express");

const router = express.Router();
const {createUser, signin} = require("../controller/auth")

router.route("/signup").post(createUser)
router.route("/signin").post(signin)

module.exports = router;