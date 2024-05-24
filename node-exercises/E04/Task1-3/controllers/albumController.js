// let { albums } = require("../albums.json");
const AlbumModel = require("../models/albumModel");

// api/albums
// GET
// Get all albums
const getAllAlbums = async (_req, res) => {
  try {
    const albums = await AlbumModel.find({});

    console.log("All Albums", albums);

    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// api/albums
// POST
// Add new album
const addAlbum = async (req, res) => {
  const { artist, title, year, genre, tracks } = req.body;

  // If empty field
  if (!artist || !title || !year || !genre || !tracks) {
    return res.status(400).json({ success: false });
  }

  // Add album to db
  try {
    const album = {
      artist,
      title,
      year,
      genre,
      tracks,
    };

    // albums = albums.concat(album);
    const newAlbum = await AlbumModel.create(album);

    res.status(201).json({ success: true, album: newAlbum });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// api/albums/:id
// PUT
// Update album
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  // const { artist, title, year, genre, tracks } = req.body;

  try {
    // Update year
    const update = { year: 2021 };

    const album = await AlbumModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });

    // If album not found
    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` });
    }

    console.log("ablum", album);
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: error });
  }
};

// api/albums/:id
// DELETE
// Delete album
const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  console.log("id", id);

  try {
    // const album = albums.find((al) => al.id === Number(id));
    const album = await AlbumModel.findByIdAndDelete({ _id: id });

    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` });
    }

    const newAlbums = await AlbumModel.find({});

    return res.status(200).json({ success: true, data: newAlbums });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
