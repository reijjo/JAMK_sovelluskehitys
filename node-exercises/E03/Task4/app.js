require("dotenv").config();
require("./db/mongodb");
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("./public"));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

const albumRouter = require("./routes/albumRoute");
const connectMongoDB = require("./db/mongodb");

app.use("/api/albums", albumRouter);

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
