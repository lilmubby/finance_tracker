// const connectDb = require("./db/connect");

const express = require("express");
const app = express()
require("dotenv").config()

//Routes Import
const authRouter = require("./routes/auth");
const expenseRouter = require("./routes/expense")
const tokenRouter = require("./routes/token")
const incomeRouter = require("./routes/income.routes")

// Middlewares Import
const authMiddleware = require("./middleware/auth")
const errorHandler = require("./middleware/errorHandler");


app.get("/", (req, res) => {
  res.send("Server is working!!!")
})

// Common Middleware
app.use(express.json())
// app.use(express.urlencoded({extended: false}));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", authMiddleware, expenseRouter);
app.use("/api/v1/income", authMiddleware, incomeRouter);
app.use("/api/v1/token", authMiddleware, tokenRouter)

// Error Middleware
app.use(errorHandler)

module.exports = {app}