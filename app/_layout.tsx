import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '../context/AuthContext';
import { AppProvider } from '../context/AppContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#2ecc71',
    tertiary: '#e74c3c',
    surface: '#ffffff',
    background: '#f8f9fa',
  },
};

export default function RootLayout() {
  useFrameworkReady();

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="property" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AppProvider>
      </AuthProvider>
    </PaperProvider>
  );
}