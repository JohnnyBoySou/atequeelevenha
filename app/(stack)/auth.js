import React, { useContext } from 'react';
import { Column, Main, Title, Label, } from '@theme/global';
import { Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin,} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { ThemeContext } from 'styled-components/native';
import { MotiView } from 'moti';
 
export default function Auth() {
    const {color, font} = useContext(ThemeContext)

    GoogleSignin.configure({
      webClientId: process.env.WEB_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID, 
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      profileImageSize: 120, 
    });
 
    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const user = await GoogleSignin.signIn();
        const usr = {
          nome: user.user.name,
          email: user.user.email,
          avatar: user.user.photo,
          id: user.user.id,
          dark_mode: false,
          fonte_grande: false,
          hd_images: true,
          gaming: true,
      }
        AsyncStorage.setItem('user', JSON.stringify(usr))
        router.push('/(stack)')
      } catch (error) {
        console.log(error.DEVELOPER_ERROR)
      }
    };

    const getUser = async () => { 
      try {
        const user = await AsyncStorage.getItem('user')
        const usr = JSON.parse(user)
        if(usr === null){
          signIn()
        }
        else if(usr !== null){
          router.push('/(stack)')
        }
      }
        catch (error) {
        console.log(error)
      } }

    return (
        <Main style={{ alignItems: 'center',  }}>
                <Image  source={require('@assets/imgs/login.png')} style={{  position: 'absolute', top: 0, left: 0, width: '100%', height: '110%'}} imageStyle={{borderRadius: 32,}}/>
                <MotiView from={{opacity: 0, transformY: 40,}} animate={{opacity: 1, transformY: 0}} transition={{delay: 100, duration: 300,}}>
                  <Column style={{ marginHorizontal: 20, justifyContent: 'center',  borderRadius: 24, paddingHorizontal: 24, marginTop: 150,}}>
                  <Image source={require('@assets/imgs/logo_3.png')} style={{ width: 140, height: 130, marginBottom: 24, alignSelf: 'center',}} />
                  <Title style={{ fontSize: 62, color: "#142B74", fontFamily: font.bold, lineHeight: 56}}>Entre para Continuar</Title>
                  <Label style={{ color: "#485784", fontSize: 24, }}>Faça login para aproveitar {'\n'}diversas funções exclusivas.</Label>
                  <Pressable onPress={getUser} style={{ flexDirection:'row',   display: 'flex', borderRadius: 12, marginTop: 30, backgroundColor: "#fff", paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                      <Image source={{uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'}} style={{width: 32, height: 32, marginRight: 12,}} />
                      <Title style={{ color: color.primary, }}>Entrar com Google</Title>
                  </Pressable>
                  </Column> 
                </MotiView>
        </Main>
    )
}