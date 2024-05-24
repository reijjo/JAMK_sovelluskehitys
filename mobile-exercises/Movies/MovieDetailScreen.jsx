import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableHighlight,
  Button,
} from 'react-native';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MovieDetailScreen(props) {
  const {route} = props;
  const {movie} = route.params;
  const [info, setInfo] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          movie.id +
          '?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos',
      )
      .then(response => {
        setInfo(response.data);
      });
  }, [movie.id]);

  console.log('info', JSON.stringify(info.videos, null, 2));

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
      Alert.alert('Video has finished playing!');
    }
  });

  const togglePlaying = useCallback(() => {
    setPlayVideo(prev => !prev);
  }, []);

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;

  var genres = '';
  if (info !== undefined && info.genres !== undefined) {
    for (var i = 0; i < info.genres.length; i++) {
      genres += info.genres[i].name + ' ';
    }
  }

  let videos = [];
  if (
    info !== undefined &&
    info.videos !== undefined &&
    info.videos.results !== undefined
  ) {
    videos = info.videos.results[0];
  }

  console.log('videos', JSON.stringify(videos, null, 2));

  return (
    <View>
      <Image source={{uri: imageurl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.text}>{movie.release_date}</Text>
        <Text style={styles.text}>{movie.overview}</Text>
        <Text style={styles.text}>Genres: {genres}</Text>
        <Text style={styles.text}>Homepage: {info.homepage}</Text>
        <Text style={styles.text}>Runtime: {info.runtime} min</Text>
        <Text style={styles.text}>Videos: </Text>
        <TouchableHighlight onPress={togglePlaying}>
          <Text style={styles.video}>{videos.name}</Text>
        </TouchableHighlight>
        {playVideo && (
          <View>
            <YoutubePlayer
              height={300}
              play={playVideo}
              videoId={videos.key}
              onChangeState={onStateChange}
            />
            <Button
              title={playVideo ? 'pause' : 'play'}
              onPress={togglePlaying}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 670 / 250,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 4,
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  video: {
    color: 'blue',
  },
});
