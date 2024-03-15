import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import App from './src/routes/index';
import dark from './src/theme/dark';

export default function Main() {
  return (
      <ThemeProvider theme={dark}>
        <StatusBar style="light" />
        <App />
      </ThemeProvider>
  );
}
/*
 ["expo-font",
        {
          "fonts": ["./assets/fonts/Circular_Black.ttf", "./assets/fonts/Circular_Book.ttf", "./assets/fonts/Circular_Medium.ttf", "./assets/fonts/Circular_Bold.ttf"]
        }
      ]*/