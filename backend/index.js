const connectDB = require("./db/connect");
const {app} = require("./app")

const port = process.env.PORT || 5000

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