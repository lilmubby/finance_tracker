const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode,
    msg: err.message || 'Something went wrong try again later',
  }
  res.send(customError)

  next()
}
module.exports = errorHandler