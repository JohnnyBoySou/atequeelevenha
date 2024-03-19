import { Stack, } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components/native';
import dark from '@theme/dark';
import light from '@theme/light';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function StackLayout() {
  
  const theme = useColorScheme()
  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="pins" options={{...TransitionPresets.ModalPresentationIOS    , }}/>
        <Stack.Screen name="index"  options={{...TransitionPresets.ModalSlideFromBottomIOS  , }} />
        <Stack.Screen name="reels" options={{...TransitionPresets.RevealFromBottomAndroid      , }}/>
        <Stack.Screen name="calendar" options={{...TransitionPresets.ModalPresentationIOS    , }} />
        <Stack.Screen name="error"  options={{...TransitionPresets.RevealFromBottomAndroid      , }} />
        <Stack.Screen name="post/[item]"  options={{...TransitionPresets.ModalPresentationIOS   , }}/>
        <Stack.Screen name="shorts/[item]" options={{...TransitionPresets.ModalPresentationIOS   , }}/>
        <Stack.Screen name="prey" options={{...TransitionPresets.ModalPresentationIOS    , }}/>
        <Stack.Screen name="reels_scroll" options={{...TransitionPresets.ModalPresentationIOS    , }}/>
      </Stack>
    </ThemeProvider>
  );
}



/*
  <Stack.Screen name="Home" component={HomePage} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Post" component={PostPage} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShortDetails" component={ShortDetails} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Prey" component={PreyPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
            <Stack.Screen name="Calendar" component={CalendarPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
            <Stack.Screen name="Reels" component={ReelsPage} options={{...TransitionPresets.RevealFromBottomAndroid      , }}/>
            <Stack.Screen name="ReelsScroll" component={ReelsScrollPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/> */