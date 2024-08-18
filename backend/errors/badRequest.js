class BadRequest extends Error {
  constructor(message, error) {
    super(message)
    this.statusCode = 400,
    this.error = error
  }
}

module.exports = BadRequest