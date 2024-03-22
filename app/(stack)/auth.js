import React, { useState, useEffect } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
 
export default function Auth() {

    const [userInfo, setUserInfo] = useState(null);

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
        setUserInfo(user)
        AsyncStorage.setItem('user', JSON.stringify(userInfo))
        console.log(user)
      } catch (error) {
        console.log(error.DEVELOPER_ERROR)
      }
    };


    const getUser = () => { 
      try {
        const user = AsyncStorage.getItem('user')
        setUserInfo(user)
        if(user.length === 0) signIn()
      }
        catch (error) {
        console.log(error)
      }
      }


    useEffect(() => {
      getUser()
    }, [])

    return (
        <Main>
            <Scroll>
                <Column style={{ width: '50%', alignSelf: 'center', }}>
                <Title style={{ fontSize: 32, }}>Entrar</Title>
                <Label>Faça login para ter acesso a várias funções.</Label>
                <Pressable onPress={signIn  } >
                    <Title>Entrar com google</Title>
                </Pressable>

                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={signIn}/>

                  <Image source={{uri: userInfo?.user?.photo}} style={{width: 100, height: 100}} />
              
                </Column>
            </Scroll>
        </Main>
    )
}