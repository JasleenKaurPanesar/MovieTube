import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const PopularMoviesList = ({navigation}) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchPopularMovies = async () => {
    try {
      const API_KEY = 'c087d42e85237c5418c0f15114845345';
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.results) {
        setPopularMovies(data.results);
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };
  const handleGoToMovieSearch = () => {
    console.log('check');
    navigation.navigate('MovieSearch');
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

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
      <Text style={styles.title}>Popular Movies</Text>
      <TouchableHighlight onPress={handleGoToMovieSearch}>
        <Text style={styles.buttonText}>Click Here for Movie Search</Text>
      </TouchableHighlight>
      <FlatList
        data={popularMovies}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  buttonText: {
    color: 'red',
  },
});

export default PopularMoviesList;
