// const connectDb = require("./db/connect");
const connectDB = require("./db/connect")
const express = require("express");
const app = express()
require("dotenv").config()
//Routes
const authRouter = require("./routes/auth");
const expenseRouter = require("./routes/expense")
const tokenRouter = require("./routes/token")

// Middlewares
const authMiddleware = require("./middleware/auth")


const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("Server is working!!!")
})
app.use(express.json())
// app.use(express.urlencoded({extended: false}));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", authMiddleware, expenseRouter);
app.use("/api/v1/token", authMiddleware, tokenRouter)
app.use(errorHandler)

const runDb = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(5000, ()=> {
      console.log("server listening on " + port);
    })
  } catch (error) {
    console.log({err: error});
  }
}

runDb()
