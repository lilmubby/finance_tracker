const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  }
  const customJson ={
    message: customError.msg
  }
  if (err.error) {
    customJson.error = err.error
  } 

  return res.status(customError.statusCode).json(customJson)
}
module.exports = errorHandler