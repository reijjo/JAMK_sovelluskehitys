let { albums } = require("../albums.json");

// api/albums
// GET
// Get all albums
const getAllAlbums = (_req, res) => {
  res.status(200).json({ success: true, data: albums });
};

// api/albums
// POST
// Add new album
const addAlbum = (req, res) => {
  const { artist, title, year, genre, tracks } = req.body;

  if (!artist || !title || !year || !genre || !tracks) {
    return res.status(400).json({ success: failed });
  }

  const maxId = Math.max(...albums.map((album) => album.id), 0);
  const newID = maxId + 1;
  const album = {
    id: newID,
    artist,
    title,
    year,
    genre,
    tracks,
  };

  albums = albums.concat(album);

  res.status(201).json({ success: true, album: album });
};

// api/albums/:id
// PUT
// Update album
const updateAlbum = (req, res) => {
  const { id } = req.params;
  const { artist, title, year, genre, tracks } = req.body;

  const album = albums.find((album) => album.id === Number(id));

  // If album not found
  if (!album) {
    return res
      .status(404)
      .json({ success: false, msg: `No album found with id ${id}` });
  }

  const updatedAlbums = albums.map((album) => {
    if (album.id === Number(id)) {
      (album.artist = artist),
        (album.title = title),
        (album.year = year),
        (album.genre = genre),
        (albums.tracks = tracks);
    }

    return album;
  });
  res.status(200).json({ success: true, data: updatedAlbums });
};

// api/albums/:id
// DELETE
// Delete album
const deleteAlbum = (req, res) => {
  const { id } = req.params;

  console.log("id", id);
  const album = albums.find((al) => al.id === Number(id));

  if (!album) {
    return res
      .status(404)
      .json({ success: false, msg: `No album found with id ${id}` });
  }

  const newAlbums = albums.filter((album) => album.id !== Number(id));

  return res.status(200).json({ success: true, data: newAlbums });
};

module.exports = {
  getAllAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
