const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  }
  const customJson ={
    status: "failed",
    message: customError.msg,
    data: null
  }
  if (err.error && Object.keys(err.error).length) customJson.data = err.error 

  return res.status(customError.statusCode).json(customJson)
}
module.exports = errorHandler