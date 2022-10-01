import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/utils/store';
import AppNavigation from './src/navigations/AppNavigation';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style='auto' />
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App;

