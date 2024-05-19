import React, { useContext, useRef, useState } from 'react';
import { Column, Main, Title, Label, } from '@theme/global';
import { Pressable, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin,} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { ThemeContext } from 'styled-components/native';
import { MotiView } from 'moti';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function Auth() {
    const {color, font} = useContext(ThemeContext)

    const visitante = useRef(null)

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
        router.push('/(stack)/(tabs)')
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
          router.push('/(stack)/(tabs)')
        }
      }
        catch (error) {
        console.log(error)}
    };


    const [email, setemail] = useState();
    const [name, setname] = useState();
    const [avatar, setavatar] = useState();

    const [emailFocused, setemailFocused] = useState(false);
    const [nameFocused, setnameFocused] = useState(false);
    //<LinearGradient colors={['transparent', '#FFF7EC']} style={{  width: '100%', height: 80, marginTop: 100, }} />


    return (
      <> 
                <Column style={{  }} >
                  <Column style={{  justifyContent: 'center',  }}>

                  <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:600, duration: 1000,}}>
                      <Title style={{  color: "#fff", fontSize: 62, lineHeight: 56, marginTop: 20, letterSpacing: -2,}}>Entre com uma conta para aproveitar tudo que temos a oferecer.</Title>
                  </MotiView>

                  <Pressable onPress={() => visitante.current.expand()} style={{ flexDirection:'row', marginTop: 12,   display: 'flex', borderRadius: 8, borderWidth: 2, borderColor: "#fff", opacity: .8,   paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                      <Title style={{ color:"#fff", }}>Entrar como Visitante</Title>
                  </Pressable>

                <Column style={{ width: '100%', height: 1.5, backgroundColor: '#ffffff90', marginVertical: 15, }}></Column>


                  <Pressable onPress={getUser} style={{ flexDirection:'row',   display: 'flex', borderRadius: 8,    backgroundColor: "#fff", paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                      <Image source={{uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'}} style={{width: 32, height: 32, marginRight: 12,}} />
                      <Title style={{ color: color.primary, }}>Entrar com Google</Title>
                  </Pressable>
                  </Column> 

               

                </Column>
                 <BottomSheet ref={visitante} snapPoints={[0.1, 400]} style={{borderRadius: 24, }} backgroundStyle={{borderRadius:24,}} handleStyle={{ backgroundColor: "#E26D5E", borderTopLeftRadius: 24, borderTopRightRadius: 24,}} handleIndicatorStyle={{ backgroundColor: "#BC4839", width: 80, height: 8,}}>
                 <BottomSheetScrollView style={{ backgroundColor: "#E26D5E", paddingHorizontal: 20, paddingVertical: 10, }}>
                   <Column style={{ marginTop: 12, }}>
                     <Label style={{ color: nameFocused ? color.primary : "#707070", fontSize: 24, }}>Nome completo</Label>
                     <TextInput
                       value={name}
                       mode='outlined'
                       onFocus={() => setnameFocused(true)}
                       onBlur={() => setnameFocused(false)}
                       onChangeText={text => setname(text)}
                       contentStyle={{ fontFamily: 'Font_Book' }}
                       style={{ marginTop: 6, fontSize: 24,  fontFamily: 'Font_Book', borderWidth: 2, borderColor: nameFocused ? color.primary : "#00000030", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 14,}}
                   
                     />
                   
                       <Label style={{ color: emailFocused ? color.primary : "#707070", fontSize: 24, }}>E-mail</Label>
                       <TextInput
                         value={email}
                         onFocus={() => setemailFocused(true)}
                         onBlur={() => setemailFocused(false)}
                         onChangeText={text => setemail(text)}
                         contentStyle={{ }}
                         keyboardType='email-address'
                         style={{ marginTop: 6, fontSize: 24,  fontFamily: 'Font_Book', borderWidth: 2, borderColor: emailFocused ? color.primary : "#00000030", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, }}
                       />
                   
                   </Column>
                 </BottomSheetScrollView>

                 </BottomSheet>
                 </>

    )
}