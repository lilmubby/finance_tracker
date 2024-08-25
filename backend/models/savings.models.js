const mongoose = require("mongoose")

const savingsSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Kindly provide savings amount"],
    min: [100, "Saving amount must be greater than 99"]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
    required: [true, 'User does not exist'],
  },
}, { timestamps: true })

module.exports = mongoose.model("savings", savingsSchema)