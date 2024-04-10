const express = require("express");

const router = express.Router();
const {createUser} = require("../controller/auth")

router.route("/signIn").post(createUser)

module.exports = router;