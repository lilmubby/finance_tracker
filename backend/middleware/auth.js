const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authentication failed")
    }
    const token = authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.payload = {
      id: payload.id,
      name: payload.name
    }
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "failed",
      message: error.message || "Something went wrong. Please try again"
    })
  }
}

module.exports = auth