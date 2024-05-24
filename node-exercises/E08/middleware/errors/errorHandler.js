const { default: mongoose } = require("mongoose");
const { APIError } = require("./notFound");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ msg: `Invalid ID format: ${err.value}` });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ msg: err.message });
  }

  console.error(err);
  return res
    .status(500)
    .json({ msg: "An unexpected error occurred on the server." });
};

module.exports = errorHandler;
