import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import UserProfile from './screens/UserProfile';

const stackNavigator = createStackNavigator({
  Home: Home,
  UserProfile: UserProfile
});

const AppContainer = createAppContainer(stackNavigator);

function App() {
  return <AppContainer />;
}

export default App;
