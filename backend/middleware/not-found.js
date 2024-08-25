const notFound = (req, res) => res.status(404).json({
  status: "failed",
  message: "Route not found"
})

module.exports = notFound