// const connectDb = require("./db/connect");

const express = require("express");
const app = express()
require("dotenv").config()

//Routes Import
const authRouter = require("./routes/auth");
const expenseRouter = require("./routes/expense")
const tokenRouter = require("./routes/token")
const incomeRouter = require("./routes/income.routes")
const savingsRouter = require("./routes/savings.routes")

// Middlewares Import
const authMiddleware = require("./middleware/auth")
const errorHandler = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/not-found")


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
app.use("/api/v1/savings", authMiddleware, savingsRouter)

// Error Middleware
app.use(errorHandler)
app.use(notFoundMiddleware)

module.exports = {app}