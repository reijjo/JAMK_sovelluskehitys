const express = require("express");
const albumRouter = express.Router();
const checkUser = require("../middleware/user");
const {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

albumRouter.get("/", getAllAlbums);
albumRouter.post("/", addAlbum);
albumRouter.put("/:id", updateAlbum);
albumRouter.delete("/:id", checkUser, deleteAlbum);

module.exports = albumRouter;
