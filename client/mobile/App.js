import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import Navigation from './navigation/Navigation';

enableScreens();

export default function App() {
  
  return (
    <NavigationContainer>
      <AuthContextProvider> 
        <Navigation/>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
