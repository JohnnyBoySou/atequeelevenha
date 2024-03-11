import React, { useState, useEffect, } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../pages/home';
import PostPage from '../pages/post/details';
import ShortDetails from '../pages/shorts/details';
import PreyPage from '../pages/prey/details';
import CalendarPage from '../pages/calendar';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function Router() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      try{
        await Font.loadAsync({
          Font_Book: require('../assets/fonts/Circular_Book.ttf'),
          Font_Medium: require('../assets/fonts/Circular_Medium.ttf'),
          Font_Bold: require('../assets/fonts/Circular_Bold.ttf'),
          Font_Black: require('../assets/fonts/Circular_Black.ttf'),
        });}
      catch(e){console.log(e)}
      finally{setFontsLoaded(true)}
    }
    loadFonts();
  }, []);

  useEffect( ()=> {
     SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
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
