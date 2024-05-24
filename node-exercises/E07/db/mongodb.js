require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const connectMongoDB = (url) => {
  return mongoose.connect(url);
};

const mongoStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24 * 7,
});

module.exports = { connectMongoDB, mongoStore };
