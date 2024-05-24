import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:developer' as dev;
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class Movies {
  final int id;
  final String title;
  final String releaseDate;
  final String voteAvg;
  final bool adult;
  final String desc;
  final String poster;

  const Movies(
      {required this.id,
      required this.title,
      required this.releaseDate,
      required this.voteAvg,
      required this.adult,
      required this.desc,
      required this.poster});

  factory Movies.fromJson(Map<String, dynamic> json) {
    return Movies(
        id: json['id'] as int,
        title: json['title'] as String,
        releaseDate: json['release_date'] as String,
        voteAvg: json['vote_average'].toString(),
        adult: json['adult'] as bool,
        desc: json['overview'] as String,
        poster: json['poster_path'] as String);
  }
}

// Video Details
class Video {
  final String key;
  final String name;

  const Video({required this.key, required this.name});

  factory Video.fromJson(Map<String, dynamic> json) {
    return Video(key: json['key'] as String, name: json['name'] as String);
  }
}

// Movie Details
class MovieDetails {
  final String img;
  final List<String> genre;
  final String desc;
  final List<Video> videos;

  const MovieDetails({
    required this.img,
    required this.genre,
    required this.desc,
    required this.videos,
  });

  factory MovieDetails.fromJson(Map<String, dynamic> json) {
    final genres = (json['genres'] as List)
        .map((genre) => genre['name'] as String)
        .toList();
    final videos = (json['videos']['results'] as List)
        .map((video) => Video.fromJson(video))
        .toList();

    return MovieDetails(
      img: json['backdrop_path'] as String,
      genre: genres,
      desc: json['overview'] as String,
      videos: videos,
    );
  }
}

Future<List<Movies>> fetchMovies(http.Client client) async {
  final response =
      // await client.get(Uri.parse('https://ptm.fi/data/flutter_employees.json'));
      await client.get(Uri.parse(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos'));

  if (response.statusCode == 200) {
    final json = jsonDecode(response.body);

    if (json.containsKey('results')) {
      final movies = List<Movies>.from(
          json['results'].map((movieJson) => Movies.fromJson(movieJson)));

      return movies;
    } else {
      dev.log('error');
      return [];
    }
  } else {
    dev.log('Failed to fetch movies ${response.statusCode}');
    throw Exception('Failed to fetch movies: ${response.statusCode}');
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Movies',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Movies Page - Now Playing'),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: FutureBuilder<List<Movies>>(
          future: fetchMovies(http.Client()),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return const Center(
                child: Text('An error occurred!'),
              );
            } else if (snapshot.hasData) {
              final movies = snapshot.data!;
              return MovieListItem(movies: movies);
            } else {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
          }),
    );
  }
}

// MovieListItem
class MovieListItem extends StatelessWidget {
  const MovieListItem({super.key, required this.movies});

  final List<Movies> movies;

  String isAdult(bool adult) {
    return adult ? 'Yes' : 'No';
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: movies.length,
      itemBuilder: (context, index) {
        return GestureDetector(
            onTap: () async {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => OneMovie(movie: movies[index]),
                  ));
            },
            child: SizedBox(
              child: Column(
                children: [
                  SizedBox(
                    height: 140,
                    child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(12.0),
                              child: Image.network(
                                  'http://image.tmdb.org/t/p/w500${movies[index].poster}'),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    movies[index].title,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                      'Release date: ${movies[index].releaseDate}'),
                                  Text(
                                      'Vote average: ${movies[index].voteAvg}'),
                                  Text(
                                      'Adult: ${isAdult(movies[index].adult)}'),
                                ],
                              ),
                            )
                          ],
                        )),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      children: [
                        Flexible(
                            child: Text(
                          movies[index].desc,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ))
                      ],
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.8,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: Divider(
                        thickness: 3.0,
                        color: Theme.of(context).colorScheme.primaryContainer,
                      ),
                    ),
                  )
                ],
              ),
            ));
      },
    );
  }
}

// OneMovie
class OneMovie extends StatelessWidget {
  const OneMovie({super.key, required this.movie});

  final Movies movie;

  Future<MovieDetails> fetchDetails(http.Client client) async {
    final response = await client.get(Uri.parse(
        'https://api.themoviedb.org/3/movie/${movie.id}?api_key=931c36fab39a9d137885e21f17cb2a6f&append_to_response=videos'));

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      return MovieDetails.fromJson(json);
    } else {
      throw Exception('Failed to fetch movie defails: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(
            movie.title,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: FutureBuilder<MovieDetails>(
            future: fetchDetails(http.Client()),
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return const Center(
                  child: Text('An error occured!'),
                );
              } else if (snapshot.hasData) {
                final details = snapshot.data!;

                dev.log('details $details');

                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    // crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(16.0),
                            topRight: Radius.circular(16.0)),
                        child: Image.network(
                            'http://image.tmdb.org/t/p/w500${details.img}'),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: Text(
                          movie.title,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 20),
                        ),
                      ),
                      Padding(
                          padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                          child: Text(details.genre.join(', '))),
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: Text(details.desc),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: SizedBox(
                          height: 200,
                          child: ListView.builder(
                            itemCount: details.videos.length,
                            itemBuilder: (context, index) {
                              final video = details.videos[index];

                              return Column(
                                children: [
                                  Padding(
                                      padding:
                                          const EdgeInsets.only(bottom: 4.0),
                                      child: GestureDetector(
                                        onTap: () async {
                                          Navigator.push(
                                              context,
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      VideoPage(
                                                          video: video.key)));
                                        },
                                        child: Text(
                                          video.name,
                                          style: const TextStyle(
                                              color: Colors.blue),
                                        ),
                                      )),
                                ],
                              );
                            },
                          ),
                        ),
                      )
                    ],
                  ),
                );
              } else {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
            }));
  }
}

class VideoPage extends StatelessWidget {
  final String video;

  const VideoPage({Key? key, required this.video}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Youtube player',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Column(children: [
        YoutubePlayer(
          controller: YoutubePlayerController(
            initialVideoId: video,
            flags: const YoutubePlayerFlags(
              autoPlay: true,
              mute: false,
            ),
          ),
          showVideoProgressIndicator: true,
          progressIndicatorColor: Colors.blue,
        ),
      ]),
    );
  }
}
