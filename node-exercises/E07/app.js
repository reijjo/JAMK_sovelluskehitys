require("dotenv").config();

const { connectMongoDB, mongoStore } = require("./db/mongodb");

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

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongoDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

start();
