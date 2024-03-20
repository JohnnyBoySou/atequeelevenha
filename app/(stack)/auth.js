import React, { useState, useEffect } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import * as AuthSession from  "expo-auth-session";
import { Pressable } from 'react-native';


import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {


    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '633985811853-be8t49k06ittuieblinva9737225lql3.apps.googleusercontent.com',
    });



      const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(JSON.stringify(userInfo));
        } catch (error) {
          if (isErrorWithCode(error)) {
            switch (error.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                // user cancelled the login flow
                break;
              case statusCodes.IN_PROGRESS:
                // operation (eg. sign in) already in progress
                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // play services not available or outdated
                break;
              default:
              // some other error happened
            }
          } else {
            // an error that's not related to google sign in occurred
          }
        }
      };

    async function signInWithGoogleAsync() {
        try {
            const CLIENT_ID = ''
            const REDIRECT_URI = 'https://auth.expo.io/@joaosousa/atequeelevenha'
            const SCOPE = encodeURI('profile email')
            const RESPONSE_TYPE = 'token'

            const authUrl = `http//account.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

           const { type, params } =  await AuthSession.startAsync({authUrl}) ;

           console.log(type)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Main>
            <Scroll>
                <Column style={{ width: '50%', alignSelf: 'center', }}>
                <Title style={{ fontSize: 32, }}>Entrar</Title>
                <Label>Faça login para ter acesso a várias funções.</Label>
                <Pressable onPress={promptAsync} >
                    <Title>Entrar com google</Title>
                </Pressable>
               
                </Column>
            </Scroll>
        </Main>
    )
}