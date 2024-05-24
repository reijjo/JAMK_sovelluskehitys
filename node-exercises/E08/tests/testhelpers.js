const InitAlbums = [
  {
    artist: "Toto",
    title: "Toto IV",
    year: 1982,
    genre: "Pop",
    tracks: 10,
  },
  {
    artist: "Steely Dan",
    title: "Aja",
    year: 1977,
    genre: "Jazz Rock",
    tracks: 7,
  },
  {
    artist: "Miles Davis",
    title: "Kind of Blue",
    year: 1959,
    genre: "Jazz",
    tracks: 5,
  },
];

const NewAlbum = {
  artist: "Seppo Hovi",
  title: "Tenavatähdet",
  year: 1995,
  genre: "Pop",
  tracks: 10,
};

const InitUsers = [
  {
    name: "Teemu",
    email: "Repe@repe.com",
    password: "teemu123",
    password2: "teemu123",
  },
  {
    name: "MrAdmin",
    email: "mradmin@repe.com",
    password: "teemu123",
    password2: "teemu123",
    role: "admin",
  },
];

const basicUser = {
  name: "Teemu",
  password: "teemu123",
};

const adminUser = {
  name: "MrAdmin",
  password: "teemu123",
};

module.exports = { InitAlbums, NewAlbum, InitUsers, basicUser, adminUser };
