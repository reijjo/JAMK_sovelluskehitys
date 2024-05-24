import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import YouTube from "react-youtube";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          props.movie.id +
          "?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos"
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, [props.movie.id]);

  let IMAGEPATH = "http://image.tmdb.org/t/p/w500";
  let imageurl = IMAGEPATH + props.movie.poster_path;

  const videoPressed = (videoId) => {
    setModalOpen(true);
    setVideoId(videoId);
  };

  // get genres
  var genres = "";
  if (movie !== undefined && movie.genres !== undefined) {
    for (var i = 0; i < movie.genres.length; i++) {
      genres += movie.genres[i].name + " ";
    }
  }

  // get first youtube video
  var video = "";
  if (
    movie !== undefined &&
    movie.videos !== undefined &&
    movie.videos.results !== undefined
  ) {
    video = (
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => videoPressed(movie.videos.results[0].key)}
      >
        {movie.videos.results[0].name}
      </span>
    );
  }

  const tubeOptions = {
    playerVars: {
      autoplay: 1,
    },
  };

  const tubeReady = (event) => {
    if (modalOpen) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  return (
    <div className="Movie">
      <img src={imageurl} alt="poster" />
      <p className="MovieTitle">
        {props.movie.original_title} : {props.movie.release_date}
      </p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span>
      <br />
      <span className="VideosText">Video: {video}</span>

      <Modal
        style={modalStyles}
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
      >
        <YouTube videoId={videoId} opts={tubeOptions} onReady={tubeReady} />
      </Modal>
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos"
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  } else {
    const movieItems = movies.map((movie, index) => (
      <MovieListItem key={index} movie={movie} />
    ));

    return <div style={{ flex: 1, padding: 20 }}>{movieItems}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
