import React, { useState , useCallback } from 'react';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../pages/home';
import PostPage from '../pages/post/details';
import ShortDetails from '../pages/shorts/details';
import PreyPage from '../pages/prey/details';
import CalendarPage from '../pages/calendar';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Font_Book: require('../assets/fonts/Circular_Book.ttf'),
    Font_Medium: require('../assets/fonts/Circular_Medium.ttf'),
    Font_Bold: require('../assets/fonts/Circular_Bold.ttf'),
    Font_Black: require('../assets/fonts/Circular_Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false,  }} >
            <Stack.Screen name="Home" component={HomePage} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Post" component={PostPage} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShortDetails" component={ShortDetails} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Prey" component={PreyPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
            <Stack.Screen name="Calendar" component={CalendarPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
       </Stack.Navigator>
    </NavigationContainer>
   );
}
