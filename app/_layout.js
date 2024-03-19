import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Font_Book: require('@assets/fonts/Circular_Book.ttf'),
    Font_Medium: require('@assets/fonts/Circular_Medium.ttf'),
    Font_Bold: require('@assets/fonts/Circular_Bold.ttf'),
    Font_Black: require('@assets/fonts/Circular_Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) { return null; }
  return(
    <GestureHandlerRootView style={{ flex: 1, }}>
        <Slot/>
    </GestureHandlerRootView>
  ) 
}

