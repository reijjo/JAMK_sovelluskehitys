const express = require("express");
const albumRouter = express.Router();
const { checkUser, isAuthenticated } = require("../middleware/user");
const {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

// albumRouter.get("/", getAllAlbums);
// albumRouter.post("/", checkUser, addAlbum);
// albumRouter.put("/:id", checkUser, updateAlbum);
// albumRouter.delete("/:id", checkUser, deleteAlbum);

albumRouter.get("/", getAllAlbums);
albumRouter.post("/", isAuthenticated, addAlbum);
albumRouter.put("/:id", isAuthenticated, updateAlbum);
albumRouter.delete("/:id", isAuthenticated, deleteAlbum);

module.exports = albumRouter;
