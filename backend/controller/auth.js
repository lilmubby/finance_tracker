const authModel = require("../models/auth");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  // res.send("Create User")
  try {
    const auth = await authModel.create(req.body);
    const token = auth.generateToken()
    res.send({ name: auth.name, email: auth.email, token })
  } catch (error) {
    console.log(error);
    const errorMessages = error && error?.errors && Object.entries(error?.errors).reduce((acc, [key, value]) => {
      acc[key] = value.message;
      return acc;
    }, {});
    if (error.name === "ValidationError") {
      return res.status(400).send({
        status: "Failed",
        message: error._message,
        data: errorMessages
      })
    }
    if (error.code === 11000 && error.keyValue["email"]) {
      return res.status(400).send({
        status: "Failed",
        message: "Email is already taken",
        data: null,
      })
    }
    res.status(500).send({
      status: "Failed",
      message: "Something went wrong, Please try again later"
    })
  }
}

module.exports = {createUser}