const mongoose = require("mongoose");
const supertest = require("supertest");
const express = require("express");
const app = require("../app");
const AlbumModel = require("../models/albumModel");
const {
  InitAlbums,
  NewAlbum,
  InitUsers,
  basicUser,
  adminUser,
} = require("./testhelpers");
const UserModel = require("../models/userModel");

const api = supertest(app);

beforeAll(async () => {
  try {
    await AlbumModel.deleteMany({});
    await AlbumModel.insertMany(InitAlbums);
    await UserModel.deleteMany({});
    await api.post("/register").send(InitUsers[0]).expect(201);
    await api.post("/register").send(InitUsers[1]).expect(201);
  } catch (error) {
    console.error("Error deleting / adding albums", error);
  }
});

describe("Album tests", () => {
  describe("Test set 1", () => {
    test("albums are returned as json", async () => {
      await api
        .get("/api/albums")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("Number of albums is 3", async () => {
      const result = await api.get("/api/albums").expect(200);
      expect(result.body.data).toHaveLength(InitAlbums.length);
    });
  });

  describe("Test set 2", () => {
    test("Add album NO login", async () => {
      await api.post("/api/albums").send(NewAlbum).expect(404);

      const result = await api.get("/api/albums").expect(200);
      expect(result.body.data).toHaveLength(InitAlbums.length);
    });

    test("Add album logged in", async () => {
      const logging = await api
        .post("/login", express.urlencoded({ extended: false }))
        .send(basicUser);
      cookies = logging.headers["set-cookie"];

      await api
        .post("/api/albums")
        .set("Cookie", cookies)
        .send(NewAlbum)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // console.log("new", newAlbum.body);

      const result = await api.get("/api/albums").expect(200);
      expect(result.body.data).toHaveLength(InitAlbums.length + 1);

      const albumData = result.body.data.find((a) => a.artist === "Seppo Hovi");
      expect(albumData.artist).toBe("Seppo Hovi");
      expect(albumData.title).toBe("Tenavatähdet");
      expect(albumData.year).toBe(1995);
      expect(albumData.genre).toBe("Pop");
      expect(albumData.tracks).toBe(10);
    });
  });

  describe("Test set 3", () => {
    test("Delete album", async () => {
      const getAlbums = await api.get("/api/albums").expect(200);
      const albumData = getAlbums.body.data.find(
        (a) => a.artist === "Seppo Hovi"
      );

      const logging = await api
        .post("/login", express.urlencoded({ extended: false }))
        .send(basicUser);
      cookies = logging.headers["set-cookie"];

      await api
        .delete(`/api/albums/${albumData._id}`)
        .set("Cookie", cookies)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const result = await api.get("/api/albums").expect(200);
      expect(result.body.data).toHaveLength(InitAlbums.length);

      const albumData2 = result.body.data.find(
        (a) => a.artist === "Seppo Hovi"
      );
      expect(albumData2).toBe(undefined);
    });

    test("Deleting album that doesnt exists", async () => {
      await api
        .delete(`/api/albums/9845322122`)
        .set("Cookie", cookies)
        .expect(500)
        .expect("Content-Type", /application\/json/);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
