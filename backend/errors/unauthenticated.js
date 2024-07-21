class Unauthentitacated extends Error {
  constructor(message, error) {
    super(message)
    this.statusCode = 401;
    this.error = error
  }
}

module.exports = Unauthentitacated