const { default: mongoose } = require("mongoose");
const { APIError } = require("./notFound");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    // console.log("CastError", err);
    return res.status(err.status).json({ msg: "CastError" });
  }
  return res
    .status(err.status)
    .json({ msg: "There was an error, please try again." });
};

module.exports = errorHandler;
