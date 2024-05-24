const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

const albumRouter = require("./routes/albumRoute");

app.use("/api/albums", albumRouter);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
