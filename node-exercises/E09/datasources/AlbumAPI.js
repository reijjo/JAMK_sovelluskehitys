const { GraphQLError } = require("graphql");
const albums = require("../data/albums");
const _ = require("lodash");
const albumModel = require("../models/albumModel");

class AlbumAPI {
  constructor() {}
  initialize(config) {}
  async getAlbums() {
    // return albums;
    const albums = albumModel.find({});
    return albums;
  }
  async getAlbumsById(_id) {
    // const album = _.filter(albums, { _id });
    const album = await albumModel.findOne({ _id });
    console.log("album", album);
    return album;
  }
  async deleteAlbum(_id) {
    // const albumToDelete = albums.find((a) => a._id === _id);
    const albumToDelete = await albumModel.findOneAndDelete({ _id });
    if (albumToDelete === undefined) {
      throw new GraphQLError("No album found");
    }

    // const newAlbums = albums.filter((a) => a._id !== _id);
    const newAlbums = await albumModel.find({});
    console.log("newAlbums", newAlbums);
    return newAlbums;
  }
}

module.exports = AlbumAPI;
