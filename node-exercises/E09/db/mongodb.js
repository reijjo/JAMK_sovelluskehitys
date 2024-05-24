const mongoose = require("mongoose");

const connectMongoDB = (url) => {
  console.log(`Connecting to MongoDB env ${process.env.NODE_ENV}...`);
  return mongoose.connect(url);
};

module.exports = connectMongoDB;
