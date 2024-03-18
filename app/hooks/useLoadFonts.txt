import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

const useLoadFonts = () => {
    const [fontsLoaded] = useFonts({
        Font_Book: require('../assets/fonts/Circular_Book.ttf'),
        Font_Medium: require('../assets/fonts/Circular_Medium.ttf'),
        Font_Bold: require('../assets/fonts/Circular_Bold.ttf'),
        Font_Black: require('../assets/fonts/Circular_Black.ttf'),
      });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return { fontsLoaded, onLayoutRootView };
}

export default useLoadFonts;