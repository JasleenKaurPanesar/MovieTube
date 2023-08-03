import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieSearch from './Components/MovieSearch';
import PopularMoviesList from './Components/PopularMovieList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PopularMoviesList"
          component={PopularMoviesList}
          options={{
            title: 'Welcome to Popular Movies List',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="MovieSearch"
          component={MovieSearch}
          options={{
            title: 'Search Your Movie',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
