const express = require("express");
const { addExpense } = require("../controller/expense");
const router = express.Router()

router.route("/").post(addExpense)

module.exports = router