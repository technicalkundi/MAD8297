import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2563eb',
      background: '#ffffff',
      card: '#ffffff',
      text: '#111827',
      border: '#e5e7eb',
      notification: '#2563eb',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
