import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultPaperTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { AuthContext, AuthProvider } from '@/contexts/auth-context';
import { DataProvider } from '@/contexts/data-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useContext } from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['props.pointerEvents is deprecated']);

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootStack() {
  const { user } = useContext(AuthContext);
  const navState = useRootNavigationState();
  if (!navState?.key) return null; // wait until the root navigator is ready

  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="login" options={{ headerTitle: 'Login' }} />
          <Stack.Screen name="signup" options={{ headerTitle: 'Signup' }} />
        </>
      )}
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme = {
    ...DefaultPaperTheme,
    roundness: 10,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: '#2563eb',
      secondary: '#0ea5e9',
      surface: '#ffffff',
      background: '#f5f7fb',
    },
  } as typeof DefaultPaperTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootStack />
            <StatusBar style="auto" />
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
