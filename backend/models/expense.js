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
  date: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
    required: [true, 'Please provide user'],
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
  this.date = !this.date ? new Date() : this.date;
})

module.exports = mongoose.model("expense", expenseSchema)