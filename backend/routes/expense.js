const express = require("express");
const { addExpense, getAllExpense } = require("../controller/expense");
const router = express.Router()

router.route("/").post(addExpense).get(getAllExpense)

module.exports = router