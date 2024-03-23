import {  useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components/native';
import dark from '@theme/dark';
import light from '@theme/light';
import { Stack } from 'expo-router'
import { useTheme } from '@hooks/useTheme';



export const unstable_settings = {
  initialRouteName: 'index',
};

export default  function StackLayout() {
   const theme = useTheme()
  
  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"  />
        <Stack.Screen name="reels"  />
        <Stack.Screen name="calendar"  />
        <Stack.Screen name="error"  />
        <Stack.Screen name="post/[item]"   />
        <Stack.Screen name="shorts/[item]"  />
        <Stack.Screen name="pins/[item]"  />
        <Stack.Screen name="pins/home"  />
        <Stack.Screen name="pins/save"  />
        <Stack.Screen name="prey" />
        <Stack.Screen name="reels_scroll" />
        <Stack.Screen name="editor/index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
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