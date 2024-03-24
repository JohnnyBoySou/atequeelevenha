import React, { useState, useContext } from 'react';
import { Column, Main, Title, Label, } from '@theme/global';
import { Dimensions, Pressable, ActivityIndicator } from 'react-native';
import {  MotiImage, MotiView } from 'moti';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';

const { width, } = Dimensions.get('window');

export default function OnboardingPage() {
    
    const {color } = useContext(ThemeContext)
    const [screen, setscreen] = useState(1);

    const [dark, setdark] = useState();
    const [font, setfont] = useState();
    const [hd, sethd] = useState();
    const [game, setgame] = useState();

    const handleSave = async () => { 
        setscreen(3)
        setTimeout(() => {
            router.navigate('/(stack)/auth')
        }, 2000);
     }
     const img = screen === 1 ?  require('@assets/imgs/onboarding_screen1.png') : require('@assets/imgs/onboarding_screen2.png')

    return (
        <Main>
            <MotiImage blurRadius={10} source={img} style={{ width: '100%', height: '110%', position: 'absolute', top: 0, left: 0, paddingVertical: 40, }} from={{translateY: 800}} animate={{translateY: 0,}} transition={{type: 'timing'}}/>
                {screen == 1 && 
                <Column style={{ flex: 1,  marginHorizontal: 40, marginVertical: 40,}}>
                    <MotiView from={{opacity: 0,  rotateY: '360deg',}} animate={{opacity: 1,  rotateY: '0deg',}} transition={{ delay:300, duration: 2000,}} >
                        <Column style={{ paddingHorizontal: 12, paddingVertical: 12, backgroundColor:"#FFF7EC",  borderRadius: 32, alignSelf: 'flex-start'}}>
                            <MotiImage source={require('@assets/imgs/logo_2.png')} style={{ width: 80, height: 80, }} />
                        </Column>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:600, duration: 1000,}}>
                        <Title style={{  color: "#fff", fontSize: 62, lineHeight: 56, marginTop: 20, letterSpacing: -2,}}>Uma nova {'\n'}maneira de  {'\n'}sentir e ver  {'\n'}a palavra  {'\n'}de Deus.</Title>
                    </MotiView>
                    <MotiView from={{opacity: 0, translateX: 40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:800, duration: 1000,}}>
                        <Label style={{ color: "#f7f7f7", fontSize: 28, marginVertical: 12,}}>Estamos aqui para ajudar na sua rotina diária de estudos da bíblia e fortalecer seus laços com Deus. </Label>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateX: -40}} animate={{opacity: 1, translateX: 0 }} transition={{ delay:1000, duration: 1000,}}>
                        <Pressable onPress={() => {setscreen(2)}}  style={{  paddingVertical: 16, borderRadius: 8, marginVertical: 20, backgroundColor: "#FFF7EC",  }}>
                            <Title style={{ color: "#3E59AE", fontSize: 24, textAlign: 'center' }}>Continuar</Title>
                        </Pressable>
                    </MotiView>

                    <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1,translateY: 0 }} transition={{ delay:1100, duration: 1000,}}>
                        <Label style={{ color: "#f7f7f7", fontSize: 20, textAlign: 'center', }}>Ao continuar você aceita os termos de privacidade.</Label>
                    </MotiView>
                  
                </Column>}

                {screen == 2 && <Column style={{   flex: 1, marginHorizontal: 40,  marginVertical: 40,}}>
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
                                <Title style={{ fontSize: 24, color: "#142B74"}}>Modo Game</Title>
                                <Column style={{ width: 70, height: 40, backgroundColor: game ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 26, height: 26, backgroundColor: game ? "#fff" : "#969696", borderRadius: 100, alignSelf: game ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                                </Column>
                        </Pressable>
                    </MotiView>

                 

                    <MotiView from={{translateY: 20, opacity: 0}} animate={{ translateY: 0, opacity: 1,}} transition={{delay: 600, duration: 600}}>
                        <Pressable onPress={() => {handleSave()}}  style={{  paddingVertical: 16, borderRadius: 8, marginVertical: 20, backgroundColor: "#3E59AE",  }}>
                            <Title style={{ color: "#FFF7EC" , fontSize: 24, textAlign: 'center' }}>Pronto</Title>
                        </Pressable>
                    </MotiView>

                   <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1,translateY: 0 }} transition={{ delay:600, duration: 500,}}>
                        <Label style={{ color: "#f7f7f7", fontSize: 20, textAlign: 'center', }}>Você pode modifica-las depois.</Label>
                    </MotiView>
                </Column>}

                {screen == 3 && <Column style={{ justifyContent: 'center', alignItems: 'center',  flex: 1, width: width,}}>
                    <MotiView from={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:300, duration: 1000,}}>
                        <Title style={{ textAlign: 'center', color: "#fff", fontSize: 52, marginBottom: 32 }}>Tudo pronto {'\n'}em um {'\n'}segundo...</Title>
                        <ActivityIndicator size={142} color="#00C6AE" />
                    </MotiView>
                </Column>}
        </Main>
    )
}