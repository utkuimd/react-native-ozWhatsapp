import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigations/AppNavigation';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <AppNavigation />
    </NavigationContainer>
  )
}

export default App;

