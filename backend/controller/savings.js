const savings = require("../models/savings.models");
const BadRequest = require("../errors/badRequest");

const addSavings = async (req, res, next) => {
  try {
    const dbSavings = await savings.create({
      ...req.body, createdBy: req.payload.id
    })
    res.status(201).json({
      status: "Successful",
      message: "Savings created successfully",
      data: dbSavings
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      next(new BadRequest(error.message.split(": ")[2]))
    }
    next(error)
  }
}

const getAllSavings = async (req, res, next) => {
  try {
    const allSavings = await savings.find({
      createdBy: req.payload.id
    })
    if (!allSavings.length) {
      return res.status(200).json({
        status: "Successful",
        message: "Kindly add your savings"
      })
    }
    res.status(200).json({
      status: "Successful",
      data: allSavings
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllSavings, addSavings}