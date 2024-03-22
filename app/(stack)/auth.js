import React, { useState, useEffect, useContext } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { ThemeContext } from 'styled-components/native';
 
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
        <Main style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Image blurRadius={20} source={{ uri: 'https://i.pinimg.com/564x/b4/f4/63/b4f46348603c0126b79737655ee3f6e6.jpg' }} style={{  position: 'absolute', top: 0, left: 0, width: '100%', height: '120%'}} imageStyle={{borderRadius: 32,}}/>
                <Column style={{ marginHorizontal: 30, justifyContent: 'center', backgroundColor: color.background, borderRadius: 24, paddingVertical: 20, paddingHorizontal: 24,}}>

                <Image source={require('@assets/imgs/logo_1.png')} style={{ width: 180, height: 120, marginBottom: 24, alignSelf: 'center',}} />
                <Title style={{ fontSize: 32, }}>Entrar</Title>
                <Label>Entre com sua conta para ter acesso a várias funções.</Label>



                <Pressable onPress={getUser} style={{ flexDirection:'row', borderWidth: 2, borderColor: color.primary, display: 'flex', borderRadius: 12, marginTop: 30, backgroundColor: "#fff", paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={{uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'}} style={{width: 32, height: 32, marginRight: 12,}} />
                    <Title style={{ color: color.primary, }}>Entrar com Google</Title>
                </Pressable>

                </Column> 
        </Main>
    )
}