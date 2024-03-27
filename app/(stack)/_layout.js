import {  useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components/native';
import dark from '@theme/dark';
import light from '@theme/light';
import { Stack } from 'expo-router'
export const unstable_settings = {
  initialRouteName: 'index',
};

export default  function StackLayout() {
   const theme = useColorScheme()
  
  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_bottom'}} />
        <Stack.Screen name="reels" options={{ animation: 'fade_from_bottom'}} />
        <Stack.Screen name="calendar"  options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="error"  options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="post/[item]"   options={{  gestureEnabled: true, animation: 'slide_from_bottom'}} />
        <Stack.Screen name="shorts/[item]"  options={{ animation: 'fade_from_bottom'}}  />
        <Stack.Screen name="pins/[item]" options={{ presentation: 'modal', gestureEnabled: true, animation: 'fade'}} />
        <Stack.Screen name="pins/home" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}} />
        <Stack.Screen name="pins/save"  options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="prey" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="reels_scroll" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="editor/index" />
        <Stack.Screen name="onboarding" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="auth" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}}/>
        <Stack.Screen name="notifications" options={{ animation: 'slide_from_right'}}/>
        <Stack.Screen name="account" options={{ animation: 'slide_from_left'}}/>
        <Stack.Screen name="likes" options={{ animation: 'slide_from_left'}}/>
        <Stack.Screen name="event" options={{ animation: 'slide_from_right'}}/>
      </Stack>
    </ThemeProvider>
  );
}



/*
        <Stack.Screen name="auth" />

  <Stack.Screen name="Home" component={HomePage} options={{...TransitionPresets.ModalSlideFromBottomIOS  , }}/>
            <Stack.Screen name="Post" component={PostPage} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="ShortDetails" component={ShortDetails} options={{...TransitionPresets.ModalPresentationIOS   , }}/>
            <Stack.Screen name="Prey" component={PreyPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
            <Stack.Screen name="Calendar" component={CalendarPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/>
            <Stack.Screen name="Reels" component={ReelsPage} options={{...TransitionPresets.RevealFromBottomAndroid      , }}/>
            <Stack.Screen name="ReelsScroll" component={ReelsScrollPage} options={{...TransitionPresets.ModalPresentationIOS    , }}/> */