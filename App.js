import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
      <StatusBar style='auto' />
    </NavigationContainer>
  )
}

export default App;

