const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Kindly provide an income amount"],
    min: [100, "income amount must be greater than 100"]
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
    required: [true, 'User does not exist'],
  },
})

module.exports = mongoose.model("income", incomeSchema)