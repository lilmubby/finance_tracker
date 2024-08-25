const express = require("express");
const router = express.Router();
const {getAllSavings, addSavings} = require("../controller/savings")

router.route("/").post(addSavings).get(getAllSavings)

module.exports = router