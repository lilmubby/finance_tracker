const jwt = require("jsonwebtoken");
const Unauthentitacated = require("../errors/unauthenticated");

const auth = (req, res, next) => {
  try {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Invalid Authentication")
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.payload = {
      id: payload.id,
      name: payload.name
    }
    next()
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      throw new Unauthentitacated("Authentication Failed", error)
    }
    if (error.name === "TokenExpiredError") {
      const data = {
        expiredAt: error.expiredAt
      }
      throw new Unauthentitacated(error.message, data)
    }
    throw new Unauthentitacated(error.message, error)
  }
}

module.exports = auth