/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// React
import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';

// Custom
import HomeScreen from './Screens/HomeScreen';
import StopwatchCreator from './Screens/StopwatchCreator';
import TimerCreator from './Screens/TimerCreator';

// App

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  StopwatchCreator: {screen: StopwatchCreator},
  TimerCreator: {screen: TimerCreator},
});


const App = createAppContainer(MainNavigator);

export default App;
