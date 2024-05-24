import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import axios from 'axios';

const MovieListItem = props => {
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + props.movie.poster_path;

  return (
    <View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
      </View>
      <View style={styles.movieItemTextContainer}>
        <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
        <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
        <Text
          numberOfLines={6}
          ellipsizeMode="tail"
          style={styles.movieItemText}>
          {props.movie.overview}
        </Text>
      </View>
    </View>
  );
};

const MoviesList = props => {
  const [movies, setMovies] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos',
      )
      .then(response => {
        setMovies(response.data.results);
      });
  }, []);

  const itemPressed = index => {
    props.navigation.navigate('MovieDetails', {movie: movies[index]});
  };

  if (movies.length === 0) {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    );
  }

  let movieItems = movies.map((movie, index) => (
    <TouchableHighlight
      onPress={_ => itemPressed(index)}
      underlayColor="lightgray"
      key={index}>
      <MovieListItem movie={movie} key={index} />
    </TouchableHighlight>
  ));

  return <ScrollView>{movieItems}</ScrollView>;
};

// const MovieListScreen: () => Node = ({ navigation }) => {
const MovieListScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MoviesList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
  },
  movieItemImage: {
    marginRight: 8,
  },
  movieItemTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap',
  },
});

export default MovieListScreen;
