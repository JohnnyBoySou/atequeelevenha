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
        <Stack.Screen name="index"  />
        <Stack.Screen name="reels"  />
        <Stack.Screen name="calendar"  options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_bottom'}}/>
        <Stack.Screen name="error"  />
        <Stack.Screen name="post/[item]"   options={{  gestureEnabled: true, animation: 'slide_from_bottom'}} />
        <Stack.Screen name="shorts/[item]"  />
        <Stack.Screen name="pins/[item]" options={{ presentation: 'modal', gestureEnabled: true, animation: 'fade'}} />
        <Stack.Screen name="pins/home" options={{ presentation: 'modal', gestureEnabled: true, animation: 'slide_from_right'}} />
        <Stack.Screen name="pins/save"  />
        <Stack.Screen name="prey" />
        <Stack.Screen name="reels_scroll" />
        <Stack.Screen name="editor/index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="notifications" options={{ animation: 'slide_from_right'}}/>
        <Stack.Screen name="account" options={{ animation: 'slide_from_left'}}/>
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