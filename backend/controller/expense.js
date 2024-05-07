const expense = require("../models/expense");

const addExpense = async (req, res) => {
  try {
    await expense.create({...req.body, createdBy: req.payload.id})
    res.status(201).json({
      status: "Successful",
      message: "Expense  updated successfully",
      data: null
    });
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: error.message,
      });
    }
    res.status(500).json(error);
  }
}

const getAllExpense = async (req, res) => {
  try {
    const allExpense = await expense.find({});
    if (!allExpense.length) {
      return res.status(200).json({
        status: "Success",
        message: "Kindly add your expenditure",
      })
    }
    
    res.status(200).json({
      status: "Success",
      data: allExpense,
    });
  } catch (error) {
    res.status(500).json({
      error,
      status: "failed",
      message: "Sorry, Something went wrong. Try again"
    })
  }
}

module.exports = {addExpense, getAllExpense}