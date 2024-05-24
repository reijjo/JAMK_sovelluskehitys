const asyncWrapper = require("../middleware/errors/asyncErrors");
const AlbumModel = require("../models/albumModel");

// api/albums
// GET
// Get all albums
const getAllAlbums = asyncWrapper(async (req, res) => {
  // Query fields
  const {
    artist,
    title,
    year,
    genre,
    tracks,
    updatedAt,
    sort,
    numericFilters,
    fields,
    startYear,
    endYear,
  } = req.query;
  const query = {};

  console.log("req.quert", req.query);

  // Filters
  if (artist) {
    query.artist = new RegExp(artist, "i");
  }

  if (title) {
    query.title = new RegExp(title, "i");
  }

  if (year) {
    query.year = year;
  }

  if (genre) {
    query.genre = new RegExp(genre, "i");
  }

  if (tracks) {
    query.tracks = tracks;
  }

  if (updatedAt) {
    query.updatedAt = updatedAt;
  }

  // Num filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["year", "tracks"];
    // Splitting the numeric filters into individual items (there can be multiple comma separated filters)
    filters = filters.split(",").forEach((item) => {
      // Destructuring each numeric filter from the array by splitting on the '-'
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        // Add numeric filters to queryObject, if field is included in options array, atm the only option is price as it is the only numeric value in the data
        query[field] = { [operator]: Number(value) };
      }
    });
  }

  // Min and Max number
  if (startYear && endYear) {
    query.year = {
      $gte: Number(startYear),
      $lte: Number(endYear),
    };
  }

  let result = AlbumModel.find(query).populate("user");

  // Sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("artist");
  }

  let albums;

  if (fields) {
    const select = fields.split(",").map((acc, field) => {
      acc[field] = 1;
      return acc;
    });
    albums = await result.select(select);
  } else {
    albums = await result;
  }

  res.status(200).json({ success: true, data: albums });
});

// api/albums
// POST
// Add new album
const addAlbum = async (req, res) => {
  const { artist, title, year, genre, tracks } = req.body;
  const userId = req.session.user._id;

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
      user: userId,
    };

    // albums = albums.concat(album);
    const newAlbum = (await AlbumModel.create(album)).populate("user");

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

  try {
    // const album = await AlbumModel.findByIdAndDelete({ _id: id });
    const album = await AlbumModel.findById({ _id: id });

    if (!album) {
      return res
        .status(404)
        .json({ success: false, msg: `No album found with id ${id}` });
    }

    console.log("ALLBUm1", album);
    console.log("ALLLBUM", album.user[0].toString());

    const currentUser = req.session.user;

    console.log(
      "current",
      currentUser._id.toString(),
      album.user[0].toString(),
      currentUser.role
    );

    if (
      currentUser.role === "admin" ||
      currentUser._id.toString() === album.user[0].toString()
    ) {
      await AlbumModel.deleteOne({ _id: id });

      const newAlbums = await AlbumModel.find({});

      return res.status(200).json({ success: true, data: newAlbums });
    } else {
      return res.status(403).json({ success: false, msg: "You cant do that." });
    }
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
