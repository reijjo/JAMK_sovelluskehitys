const { mongoStore } = require("./db/mongodb");
const { connectMongoDB } = require("./db/mongodb");
const { MONGO_URI } = require("./utils/config");

const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");

const app = express();

mongoStore.on("error", function (error) {
  console.error("Session store error", error);
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    // cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use(express.json());
app.use(express.static("./public"));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

const albumRouter = require("./routes/albumRoute");
const userRouter = require("./routes/userRoute");
const errorHandler = require("./middleware/errors/errorHandler");

app.use("/api/albums", albumRouter);
app.use("/", userRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongoDB(MONGO_URI);
    console.log("MongoDB ok.");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

start();

module.exports = app;
