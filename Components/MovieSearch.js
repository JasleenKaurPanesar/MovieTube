import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Image,
} from 'react-native';

const MovieSearch = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleMovieSearch = async () => {
    try {
      const API_KEY = 'c087d42e85237c5418c0f15114845345';
      const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        searchText,
      )}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const renderMovieItem = ({item}) => (
    <View style={styles.movieItem}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.moviePoster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieReleaseDate}>{item.release_date}</Text>
        <Text style={styles.movieOverview}>{item.overview}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter movie title..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Search" onPress={handleMovieSearch} />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moviePoster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieReleaseDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  movieOverview: {
    fontSize: 14,
  },
});

export default MovieSearch;
