const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  item: {
    type: String,
    required: [true, "Please provide an expense name"],
    minLength: 1,
  },
  amount: {
    type: Number,
    required: [true, "Please provdie an amount"],
    min: 1,
  },
  category: {
    type: String,
    default: "others",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
    required: [true, 'User does not exist'],
  },
  from: {
    type: String,
    enum: ["savings", "income"],
    default: "income"
  }
},
{timestamps: true}
)

expenseSchema.pre("save",  function() {
  this.category = !this.category ? "others" : this.category;
})

module.exports = mongoose.model("expense", expenseSchema)