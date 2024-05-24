const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectMongoDb = require("./db/mongodb");

const AlbumAPI = require("./datasources/AlbumAPI");
const { MONGO_URI } = require("./utils/config");

const typeDefs = `#graphql
	type Album {
		_id: ID!,
		artist: String,
		title: String
		year: Int,
		genre: String,
		tracks: Int
	}

	type Query {
		albums: [Album],
		albumsById(_id:ID): Album
	}

	type Mutation {
		deleteAlbum(_id:ID): [Album]
	}
`;

const resolvers = {
  Query: {
    albums: (_parent, _args, { dataSources }) => {
      return dataSources.albumApi.getAlbums();
    },
    albumsById: (_parent, { _id }, { dataSources }) => {
      return dataSources.albumApi.getAlbumsById(_id);
    },
  },
  Mutation: {
    deleteAlbum: (_parent, { _id }, { dataSources }) => {
      return dataSources.albumApi.deleteAlbum(_id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginLandingPageDisabled()]
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          albumApi: new AlbumAPI(),
        },
      };
    },
  });
  console.log(`Server ready at ${url}`);

  try {
    connectMongoDb(MONGO_URI);
    console.log("MongoDB ok.");
  } catch (e) {
    console.log("error connecting mongodb");
  }
};
start();
