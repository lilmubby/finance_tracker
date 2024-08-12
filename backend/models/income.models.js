const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Kindly provide savings amount"],
    min: [100, "Saving amount must be greater than 100"]
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