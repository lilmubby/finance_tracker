const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly Provide a Name"],
    minLength: [3, `character must be at least 3`],
  },
  email: {
    type: String,
    required: [true, 'Kindly provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  }
});

authSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.verifyPassword = async function (enteredPassword) {
  const isMatch = bcrypt.compare(enteredPassword, this.password);
  return isMatch;
}

authSchema.methods.generateToken = function () {
  const token = jwt.sign({id: this._id, name: this.name}, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRATION})
  return token;
}



module.exports = mongoose.model("auth", authSchema)