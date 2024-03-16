import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import App from './src/routes/index';
import dark from './src/theme/dark';
import light from './src/theme/light';
import { Appearance, useColorScheme, } from 'react-native';

export default function Main() {
  const [theme, setTheme] = useState(dark);
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(dark);
    } else {
      setTheme(light);
    }
  }, [colorScheme]);
  
  return (
    <ThemeProvider theme={theme}>
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