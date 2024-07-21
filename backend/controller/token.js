const jwt = require("jsonwebtoken")

const refreshToken = (req, res) => {
  const {id, name} = req.payload
  const token = jwt.sign({id, name}, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRATION})
  res.status(200).json({
    status: "Successful",
    token
  })
}

module.exports = refreshToken