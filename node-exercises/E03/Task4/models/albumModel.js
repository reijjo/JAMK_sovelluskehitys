const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  artist: String,
  title: String,
  year: Number,
  genre: String,
  tracks: Number,
});

// albumSchema.set("toJSON", {
// 	transform: (_document, returnedAlbums) => {
// 		returnedAlbums.id = returnedAlbums._id.toString()
// 		delete returnedAlbums._id
// 		delete returnedAlbums.__v
// 	}
// })

const AlbumModel = mongoose.model("Album", albumSchema);

module.exports = AlbumModel;
