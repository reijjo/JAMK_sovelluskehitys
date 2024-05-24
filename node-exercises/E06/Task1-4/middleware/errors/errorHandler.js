const { APIError } = require("./notFound");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(err.status)
    .json({ msg: "There was an error, please try again." });
};

module.exports = errorHandler;
