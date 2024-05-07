const users = require("../models/auth");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const auth = await users.create(req.body);
    const token = auth.generateToken()
    res.send({
      status: "Successful",
      data: null,
      message: "User created successfully"
    })
  } catch (error) {
    console.log(error);
    const errorMessages = error && error?.errors && Object.entries(error?.errors).reduce((acc, [key, value]) => {
      acc[key] = value.message;
      return acc;
    }, {});
    if (error.name === "ValidationError") {
      return res.status(400).send({
        status: "failed",
        message: error._message,
        data: errorMessages
      })
    }
    if (error.code === 11000 && error.keyValue["email"]) {
      return res.status(400).send({
        status: "failed",
        message: "Email is already taken",
        data: null,
      })
    }
    res.status(500).send({
      status: "failed",
      message: "Something went wrong, Please try again later"
    })
  }
}

const signin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({status: "failed", data: null, message: "Please provide email and password"})
    }
    if (!email.includes("@")) {
      return res.status(400).json({status: "failed", data: null, message: "Invalid email address"})
    }
    const user = await users.find({email});
    if (!user.length) {
      return res.status(401).json({status: "failed", data: null, message: "User deosn't exist"})
    }
    const isPasswordValid = await user[0].verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({status: "failed", data: null, message: "Incorrect Password"})
    }
    const token = user[0].generateToken()
    res.status(201).json({
      status: "Successful",
      data: {
        name: user[0].name,
        email: user[0].email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {createUser, signin}