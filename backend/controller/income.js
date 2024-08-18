const BadRequest = require("../errors/badRequest");
const income = require("../models/income.models")

const addIncome = async (req, res, next) => {
  try {
    const dbIncome = await income.create({...req.body, createdBy: req.payload.id})
    res.status(201).json({
      status: "Successful",
      message: "Income created successfully",
      data: dbIncome
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      next(new BadRequest(error.message.split(": ")[2]))
    }
    next(error)
  }
}

const getAllExpense = async (req, res, next) => {
  try {
    const allIncome = await income.find({
      createdBy: req.payload.id
    });
    if (!allIncome.length) {
      return res.status(200).json({
        status: "Successful",
        message: "Kindly add your income"
      })
    }

    res.status(200).json({
      status: "Successful",
      message: allIncome
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {addIncome, getAllExpense}