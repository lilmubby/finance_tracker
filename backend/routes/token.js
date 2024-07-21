const express = require("express")
const refreshToken = require("../controller/token")
const router = express.Router()

router.route("/").get(refreshToken)

module.exports = router