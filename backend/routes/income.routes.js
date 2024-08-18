const express = require("express");
const router = express.Router()
const {addIncome, getAllExpense} = require("../controller/income")

router.route("/").post(addIncome).get(getAllExpense)

module.exports = router