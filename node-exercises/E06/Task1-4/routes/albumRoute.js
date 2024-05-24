const express = require("express");
const albumRouter = express.Router();
const checkUser = require("../middleware/user");
const {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

// albumRouter.get("/", getAllAlbums);
albumRouter.get("/", checkUser, getAllAlbums);
albumRouter.post("/", checkUser, addAlbum);
albumRouter.put("/:id", checkUser, updateAlbum);
albumRouter.delete("/:id", checkUser, deleteAlbum);

module.exports = albumRouter;
