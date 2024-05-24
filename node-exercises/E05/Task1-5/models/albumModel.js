const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: [true, "Who is the artist?"],
    trim: true,
    minLength: [3, "At least 3 chars on artist,"],
    maxLength: [50, "Max 50 chars on artst."],
  },
  title: {
    type: String,
    required: [true, "Title?"],
    trim: true,
    minLength: [3, "Min 3 chars on title."],
    maxLength: [50, "Max 50 chars on title."],
  },
  year: {
    type: Number,
    min: [1920, "No older than 1920."],
    max: [2024, "No stuff from the future."],
  },
  genre: {
    type: String,
    enum: {
      values: ["Pop", "Jazz Rock", "Jazz", "Rock"],
      message: "{VALUE} not available",
    },
  },
  tracks: {
    type: Number,
    min: [1, "You should have min 1 track."],
    max: [100, "Max 100 tracks."],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// albumSchema.set("toJSON", {
// 	transform: (_document, returnedAlbums) => {
// 		returnedAlbums.id = returnedAlbums._id.toString()
// 		delete returnedAlbums._id
// 		delete returnedAlbums.__v
// 	}
// })

albumSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const AlbumModel = mongoose.model("Album", albumSchema);

module.exports = AlbumModel;
