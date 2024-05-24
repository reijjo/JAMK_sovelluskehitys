const result = document.querySelector(".result");
const baseUrl = `${window.location.origin}/api`;
const fetchVehicles = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/albums`);

    const albums = data.data.map((album) => {
      console.log("album", album);
      return `<ul><li>${album.artist}</li><li>${album.title}</li><li>${album.genre}</li><li>${album.tracks}</li><li>${album.year}</li></ul>`;
    });

    // console.log("albums", albums);
    result.innerHTML = albums.join("");
  } catch (error) {
    console.log(error);
    result.innerHTML = `<div class="alert alert-danger">Could not fetch data</div>`;
  }
};
fetchVehicles();
