const expense = require("../models/expense");
const jwt = require("jsonwebtoken");

const addExpense = async (req, res) => {
  try {
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.JWT_KEY);    
    const addExpense = await expense.create({...req.body, createdBy: payload.id})
    res.status(201).json({addExpense});
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

module.exports = {addExpense}