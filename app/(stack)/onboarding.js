import React, { useState, useContext, useRef } from 'react';
import { Column, Main, Title, Label, Row } from '@theme/global';
import { Dimensions, Pressable, ActivityIndicator, Image, TextInput,  } from 'react-native';
import {  AnimatePresence, MotiImage, MotiView,  } from 'moti';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { ScrollView} from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GoogleSignin,} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingPage() {
    const {color } = useContext(ThemeContext)

    const visitante = useRef(null)
    const [screen, setscreen] = useState(1);

    const [dark, setdark] = useState(false);
    const [font, setfont] = useState(false);
    const [hd, sethd] = useState(true);
    const [game, setgame] = useState(true);

     const img = screen === 1 ?  {uri: 'https://i.pinimg.com/564x/74/82/90/748290730f32926254c114a229d206ed.jpg'} : {uri: 'https://i.pinimg.com/564x/74/82/90/748290730f32926254c114a229d206ed.jpg'}


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
           avatar: user.user.photo?.length > 0 ? user.user.photo : 'https://i.pinimg.com/564x/74/82/90/748290730f32926254c114a229d206ed.jpg',
           id: user.user.id,
           dark_mode: dark,
           big_font: font,
           hd_images: hd,
           gaming: game,
       }
         await AsyncStorage.setItem('user', JSON.stringify(usr))
         router.replace('/(stack)/(tabs)')
       } catch (error) {
         console.log(error.DEVELOPER_ERROR)
       }
     };
 
     const signInVisitante = async () => {
        const usr = {
            nome: name.length > 0 ? name : 'Visitante',
            email: email.length > 0 ? email : 'test@example.com',
            avatar: avatar.length > 0 ? avatar : 'https://i.pinimg.com/564x/74/82/90/748290730f32926254c114a229d206ed.jpg',
            id: email.length > 0 ? email : 'idtest',
            dark_mode: dark,
            big_font: font,
            hd_images: hd,
            gaming: game,
        }
          await AsyncStorage.setItem('user', JSON.stringify(usr))
          router.push('/(stack)/(tabs)')
     };


 
     const [email, setemail] = useState('');
     const [name, setname] = useState('');
     const [avatar, setavatar] = useState('');
 
     const [emailFocused, setemailFocused] = useState(false);
     const [nameFocused, setnameFocused] = useState(false);

     const avatares = ['https://i.pinimg.com/564x/3b/6a/79/3b6a792f2cb185e733b22b4d1ebc30d5.jpg', 'https://i.pinimg.com/564x/e0/74/43/e07443f9eff75ec15c6460e722f03712.jpg', 'https://i.pinimg.com/564x/99/26/9e/99269e74fa0eda4d4ee264c0c6f83623.jpg', 'https://i.pinimg.com/564x/27/82/4a/27824a41abe166a53f74f281141cb6cb.jpg', 'https://i.pinimg.com/736x/de/5a/34/de5a34c06d71a1aad7bdd5d23eaca939.jpg', 'https://i.pinimg.com/564x/b6/9f/10/b69f10b35a8993b510d6ffab46ae303e.jpg',]

    return (
        <Main>
            <MotiImage blurRadius={20} source={img} style={{ width: '100%', height: '110%', position: 'absolute', top: 0, left: 0, paddingVertical: 40, }} from={{translateY: 800}} animate={{translateY: 0,}} transition={{type: 'timing'}}/>

                <AnimatePresence>
                {screen == 1 && 
                    <Column style={{ flex: 1,  marginHorizontal: 40, marginVertical: 40,}}>
                    <MotiView from={{opacity: 0}} animate={{opacity: 1,}}  exit={{opacity: 0,}} delay={500} >
                        <MotiImage from={{opacity: 0, scale: 0.6 }}  animate={{opacity: 1, scale: 1,}}  delay={500} source={require('@assets/imgs/logo_2.png')} style={{ width: 80, height: 80, backgroundColor:"#FFF7EC",  borderRadius: 24, alignSelf: 'flex-start'}} />
                        <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:600, duration: 1000,}}>
                            <Title style={{  color: "#fff", fontSize: 62, lineHeight: 56, marginTop: 20, letterSpacing: -2,}}>Uma nova {'\n'}maneira de  {'\n'}sentir e ver  {'\n'}a palavra  {'\n'}de Deus.</Title>
                        </MotiView>
                        <MotiView from={{opacity: 0, translateX: 40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:800, duration: 1000,}}>
                            <Label style={{ color: "#f7f7f7", fontSize: 28, marginVertical: 12,}}>Estamos aqui para ajudar na sua rotina diária de estudos da bíblia e fortalecer seus laços com Deus. </Label>
                        </MotiView>

                        <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:1000, duration: 1000,}}>
                            <Pressable onPress={() => {setscreen(2)}}  style={{   borderRadius: 8, marginVertical: 20, backgroundColor: "#FFF7EC",  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title style={{ color: "#3E59AE", fontSize: 24, textAlign: 'center', alignSelf: 'center', marginLeft: 100, }}>Continuar</Title>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', marginRight: 40, }}>
                                    <Column style={{ width: 3, height: 54,  backgroundColor: color.primary,  }}></Column>
                                    <MotiView from={{translateX: 0, opacity:0}} animate={{ translateX: 20, opacity: 1,}}  transition={{  delay: 1400,  duration: 500, }}> 
                                        <ArrowRight color={color.primary} strokeWidth={3}  />
                                    </MotiView>
                                </Row>
                            </Pressable>
                        </MotiView>

                        <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1,translateY: 0 }} transition={{ delay:1100, duration: 1000,}}>
                            <Label style={{ color: "#f7f7f7", fontSize: 20, textAlign: 'center', }}>Ao continuar você aceita os termos de privacidade.</Label>
                        </MotiView>
                </MotiView>
                </Column>
                }
                </AnimatePresence>
                
            <AnimatePresence>
                {screen == 2 && 
                <Column style={{   flex: 1, marginHorizontal: 40,  marginVertical: 40,}}>
                <MotiView from={{opacity: 0}} animate={{opacity: 1,}}  exit={{opacity: 0,}} delay={1000} transition={{duration: 500,}}>
                    <MotiView from={{opacity: 0, translateX: 50}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:500, duration: 1000,}}>
                        <Title style={{  color: "#fff", fontSize: 42, lineHeight: 42, letterSpacing: -2,}}>Vamos ajustar{'\n'}algumas coisas{'\n'}para melhorar{'\n'}sua experiência.</Title>
                    </MotiView>
                       
                    <MotiView from={{opacity: 0, translateX: 100}} animate={{opacity: 1, translateX: 0 }} transition={{ delay: 600, duration: 600, type: 'timing'}}>
                        <Pressable onPress={() => {setdark(!dark)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20,  marginVertical: 20, }}>
                                <Title style={{ fontSize: 24,color: "#142B74" }}>Modo Escuro</Title>
                                <Column style={{ width: 70, height: 40, backgroundColor: dark ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 26, height: 26, backgroundColor: dark ? "#fff" : "#969696", borderRadius: 100, alignSelf: dark ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                                </Column>
                        </Pressable>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateX: 100}} animate={{opacity: 1, translateX: 0 }} transition={{ delay: 800, duration: 600, type: 'timing'}}>
                        <Pressable onPress={() => {setfont(!font)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20,   }}>
                                <Title style={{ fontSize: 24, color: "#142B74"}}>Fontes Grandes</Title>
                                <Column style={{ width: 70, height: 40, backgroundColor: font ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 26, height: 26, backgroundColor: font ? "#fff" : "#969696", borderRadius: 100, alignSelf: font ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                                </Column>
                        </Pressable>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateX: 100}} animate={{opacity: 1, translateX: 0 }} transition={{ delay: 1000, duration: 600, type: 'timing'}}>
                        <Pressable onPress={() => {sethd(!hd)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20,  marginVertical: 20, }}>
                                <Title style={{ fontSize: 24, color: "#142B74"}}>Imagens em HD</Title>
                                <Column style={{ width: 70, height: 40, backgroundColor: hd ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 26, height: 26, backgroundColor: hd ? "#fff" : "#969696", borderRadius: 100, alignSelf: hd ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                                </Column>
                        </Pressable>
                        </MotiView>
                    

                        <MotiView from={{opacity: 0, translateX: 100}} animate={{opacity: 1, translateX: 0 }} transition={{ delay: 1200, duration: 600, type: 'timing'}}>
                        <Pressable onPress={() => {setgame(!game)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20,   }}>
                                <Title style={{ fontSize: 24, color: "#142B74"}}>Gameficação</Title>
                                <Column style={{ width: 70, height: 40, backgroundColor: game ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 26, height: 26, backgroundColor: game ? "#fff" : "#969696", borderRadius: 100, alignSelf: game ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                                </Column>
                        </Pressable>
                    </MotiView>

                 

                    <MotiView from={{translateY: 20, opacity: 0}} animate={{ translateY: 0, opacity: 1,}} transition={{delay: 600, duration: 600}}>
                        <Pressable onPress={() => {setscreen(3)}}  style={{  paddingVertical: 16, borderRadius: 8, marginVertical: 20, backgroundColor: "#3E59AE",  }}>
                            <Title style={{ color: "#FFF7EC" , fontSize: 24, textAlign: 'center' }}>Próximo</Title>
                        </Pressable>
                    </MotiView>

                   <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1,translateY: 0 }} transition={{ delay:600, duration: 500,}}>
                        <Label style={{ color: "#f7f7f7", fontSize: 20, textAlign: 'center', }}>Você pode modifica-las depois.</Label>
                    </MotiView>
                    </MotiView>
                </Column>}
            </AnimatePresence>
                
            <AnimatePresence>
                {screen == 3 && 
                    <Column style={{ flex: 1, justifyContent: 'center', }}>
                    <MotiView from={{opacity: 0, }} animate={{opacity: 1, }} transition={{ delay: 1400, duration: 1000,}} style={{ marginHorizontal: 30, }}>

                        <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:600, duration: 1000,}}>
                            <Title style={{  color: "#fff", fontSize: 58, lineHeight: 50, letterSpacing: -2,}}>Entre com {'\n'}uma conta para aproveitar tudo que temos a oferecer.</Title>
                        </MotiView>

                        <Pressable onPress={() => visitante.current.expand()} style={{  marginTop: 12,  borderRadius: 8, borderWidth: 2, borderColor: "#fff", opacity: .8,   paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Title style={{ color:"#fff", }}>Entrar como Visitante</Title>
                        </Pressable>

                        <Column style={{ width: '100%', height: 2, backgroundColor: '#ffffff90', marginVertical: 15, }}></Column>

                        <Pressable onPress={signIn} style={{ flexDirection:'row',   display: 'flex', borderRadius: 8,    backgroundColor: "#fff", paddingHorizontal: 32, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'}} style={{width: 32, height: 32, marginRight: 12,}} />
                            <Title style={{ color: color.primary, }}>Entrar com Google</Title>
                        </Pressable>
                    </MotiView>
                </Column>}
            </AnimatePresence>




            <AnimatePresence>
                {screen == 4 && 
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  flex: 1, }}>
                    <MotiView from={{opacity: 0, }} animate={{opacity: 1, }} transition={{ delay: 1400, duration: 1000,}}>
                        <Title style={{ textAlign: 'center', color: "#fff", fontSize: 52, marginBottom: 32 }}>Tudo pronto {'\n'}em um {'\n'}segundo...</Title>
                        <ActivityIndicator size={142} color="#00C6AE" />
                    </MotiView>
                </Column>}
            </AnimatePresence>


            <BottomSheet ref={visitante} snapPoints={[0.1, 520]} style={{borderRadius: 24, }} backgroundStyle={{borderRadius:24, }} handleStyle={{ backgroundColor: color.primary, borderTopLeftRadius: 24, borderTopRightRadius: 24, }} handleIndicatorStyle={{ backgroundColor:"#ffffff90", width: 80, height: 8,}}>
                 <BottomSheetScrollView style={{ backgroundColor: color.primary, paddingHorizontal: 20, paddingVertical: 0, }}>
                   <Column style={{ marginTop: 12, }}>
                    <Title style={{ fontSize: 32, fontFamily: 'Font_Bold', marginBottom: 12, textAlign: 'center', }}>Olá, {name?.length > 3 ? name : 'Visitante' }!</Title>

                    <Label style={{ color: avatar.length > 0 ? color.secundary : "#ffffff90", fontSize: 24, }}>Avatar</Label>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12, }}>
                        {avatares.map((item, index) => (
                            <Pressable key={index} onPress={() => setavatar(item)} style={{  borderRadius: 100, marginRight: 8, borderWidth: 4, borderColor: avatar == item ? "#fff" : 'transparent',  }}>
                                <Image source={{uri: item}} style={{ width: 84, height: 84, borderRadius: 100, }} />
                            </Pressable>
                        ))}
                    </ScrollView>


                     <Label style={{ color: nameFocused ? color.secundary : "#ffffff90", fontSize: 24, }}>Nome completo</Label>
                     <TextInput
                       value={name}
                       mode='outlined'
                       onFocus={() => setnameFocused(true)}
                       onBlur={() => setnameFocused(false)}
                       onChangeText={text => setname(text)}
                       keyboardType='default'
                       contentStyle={{ fontFamily: 'Font_Book' }}
                       style={{ marginTop: 6, color: '#fff', fontSize: 24,  fontFamily: 'Font_Book', borderWidth: 2, borderColor: nameFocused ? color.secundary : "#ffffff70", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 14,}}
                   
                     />
                   
                       <Label style={{ color: emailFocused ? color.secundary : "#ffffff90", fontSize: 24, }}>E-mail</Label>
                       <TextInput
                         value={email}
                         onFocus={() => setemailFocused(true)}
                         onBlur={() => setemailFocused(false)}
                         onChangeText={text => setemail(text)}
                         
                         contentStyle={{ }}
                         keyboardType='email-address'
                         style={{ marginTop: 6, fontSize: 24, color: '#fff',  fontFamily: 'Font_Book', borderWidth: 2, borderColor: emailFocused ? color.secundary : "#ffffff70", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, }}
                       />
                   

                        <Pressable onPress={signInVisitante} style={{ backgroundColor: '#fff', paddingVertical: 14, flexGrow: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                            <Title style={{ color: color.primary, fontSize: 24, textAlign: 'center', }}>Pronto!</Title>
                        </Pressable>
                   </Column>
                 </BottomSheetScrollView>

            </BottomSheet>
        </Main>
    )
}

