import React, { useEffect } from 'react';
import { Column } from '@theme/global';
import Animated, { useSharedValue, withSequence, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { StyleSheet, useWindowDimensions, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function () {
    const theme = useColorScheme()
    const logoScale = useSharedValue(1);
    const logoPosY = useSharedValue(0);
    const logoRotate = useSharedValue(0);
    const img = theme === "dark" ? require('@assets/imgs/logo_1_b.png') : require('@assets/imgs/logo_1.png');
    const dimensions = useWindowDimensions()
    const logoAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: logoScale.value },
                { translateY: logoPosY.value },
                { rotateY: logoRotate.value + 'deg' }
            ]
        }
    })
    function logoAnimation() {
        logoScale.value = withSequence(
            withTiming(0.7),
            withTiming(1.3),
            withTiming(1, undefined, (isFinished) => {
                if (isFinished) {
                    logoPosY.value = withSequence(
                        withTiming(50),
                        withTiming(-dimensions.height, { duration: 1000 })
                    )
                }
                runOnJS(onEndSplash)();
            }
            )
        );
        logoRotate.value = withSequence(
            withTiming(0),
            withTiming(360, { duration: 1500 })
        )
    }
    useEffect(() => {
        logoAnimation();
    }, [])

   async function onEndSplash(){
        const user = await AsyncStorage.getItem('user')
        setTimeout(() => {
            if (user) {
                router.replace('/(stack)/audio/audio');
                return;
            }
            else{
                router.push('/(stack)/onboarding');
            }
        }, 1300);
    }
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: theme === "dark" ? "#171717" : "#FFF7EC", }}>
            <Animated.Image source={img} style={[styles.logo, logoAnimatedStyle]} />
        </Column>
    )
}


const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 160,
        objectFit: 'contain',
    }
})
