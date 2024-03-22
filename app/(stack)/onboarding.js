import React, { useState, useContext } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { Dimensions, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { ThemeContext } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const { width, height} = Dimensions.get('window');

export default function OnboardingPage() {
    
    const {color } = useContext(ThemeContext)
    const [screen, setscreen] = useState(1);
    const [name, setname] = useState('João Sousa');
    const [contact, setcontact] = useState('49991935657');

    const [dark, setdark] = useState();
    const [font, setfont] = useState();
    const [hd, sethd] = useState();
    const [game, setgame] = useState();

    const handleSave = async () => { 
        const user = {
            nome: name,
            contato: contact,
            dark_mode: dark,
            fonte_grande: font,
            hd_images: hd,
            gaming: game
        }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setscreen(4)
        setTimeout(() => {
            router.navigate('/(stack)/')
        }, 2000);
     }

    return (
        <Main>
            <Scroll horizontal style={{ paddingTop: 0, }} pagingEnabled>
                
                
                {screen == 1 && <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: "#3E59AE", flex: 1, width: width,}}>
                    <MotiView from={{opacity: 0,translateY: 20,}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:300, duration: 500,}}>
                    <Label style={{ fontSize: 24, color: "#ffffff",}}>{screen} de 3</Label>
                    </MotiView>
                    <MotiView from={{opacity: 0, translateY: 20}} animate={{opacity: 1,translateY: 0 }} transition={{ delay:200, duration: 500,}}>
                        <Title style={{ textAlign: 'center', color: "#fff", fontSize: 52, }}>Queremos {'\n'}te conhecer{'\n'}um pouco{'\n'}mais!</Title>
                    </MotiView>

                    <MotiView from={{opacity: 0,translateY: 20,}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:500, duration: 500,}}>
                    <Title style={{ color: "#FFF7AF", fontSize: 28, marginTop: 20, textAlign: 'center' }}>Qual o seu nome?</Title>
                    <TextInput value={name} onChangeText={setname} style={{paddingHorizontal: 32, minWidth: 100, textAlign: 'center', color: "#fff", fontFamily:'Font_Medium', borderBottomWidth: 3, fontSize: 42, borderBottomColor: "#ffffff",  marginTop: 20, }} />
                    </MotiView>
                   {name?.length > 3 && 
                   <AnimatePresence>
                   <MotiView from={{translateY: 20, opacity: 0}} animate={{ translateY: 0, opacity: 1,}}>
                        <Pressable onPress={() => {setscreen(2)}}  style={{ backgroundColor: "#00C6AE", paddingVertical: 12, paddingHorizontal: 32, marginTop: 50,position: 'absolute', bottom: -90, alignSelf: 'center', borderRadius: 100,}}>
                            <Title style={{ color: "#fff", fontSize: 28,  }}>Próximo</Title>
                        </Pressable>
                    </MotiView>
                   </AnimatePresence>
                    }
                </Column>}

                {screen == 2 && <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: "#FFD3CD", flex: 1, width: width,}}>
                    <MotiView from={{opacity: 0,translateY: 20,}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:300, duration: 500,}}>
                        <Label style={{ fontSize: 24, color: "#142B74", }}>{screen} de 3</Label>
                    </MotiView>
                    <MotiView from={{opacity: 0,translateY: 20,}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:500, duration: 500,}}>
                        <Title style={{ textAlign: 'center', color: "#142B74", fontSize: 52, }}>Como {'\n'}entramos {'\n'}em contato {'\n'}contigo?</Title>
                    </MotiView>


                    <MotiView from={{opacity: 0,translateY: 20,}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:700, duration: 500,}}>
                    <Title style={{ color: "#3E59AE", fontSize: 28, marginTop: 20, textAlign: 'center'}}>Telefone ou E-mail</Title>
                    <TextInput value={contact} onChangeText={setcontact} style={{paddingHorizontal: 32, minWidth: 100, textAlign: 'center', color: "#142B74", fontFamily:'Font_Medium', borderBottomWidth: 3, fontSize: 42, borderBottomColor: "#142B74",  marginTop: 20, }} />
                    </MotiView>
                 
                   {contact?.length > 8 && 
                   <AnimatePresence>
                   <MotiView from={{translateY: 20, opacity: 0}} animate={{ translateY: 0, opacity: 1,}}>
                        <Pressable onPress={() => {setscreen(3)}}  style={{ backgroundColor: "#00C6AE", paddingVertical: 12, paddingHorizontal: 32, marginTop: 50,position: 'absolute', bottom: -90, alignSelf: 'center', borderRadius: 100,}}>
                            <Title style={{ color: "#fff", fontSize: 28,  }}>Próximo</Title>
                        </Pressable>
                    </MotiView>
                   </AnimatePresence>
                    }
                </Column>}

                {screen == 3 && <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: "#FFE2BA", flex: 1, width: width,}}>
                    <MotiView from={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:200, duration: 500,}}>
                        <Label style={{ fontSize: 24, color: "#142B74", }}>{screen} de 3</Label>
                    </MotiView>
                    <MotiView from={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:300, duration: 500,}}>
                        <Title style={{ textAlign: 'center', color: "#142B74", fontSize: 52, }}>Ajuste sua experiência {'\n'}no App</Title>
                    </MotiView>

                               
                    <MotiView from={{opacity: 0, translateY: -60}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:500, duration: 500,}}>
                    <Pressable onPress={() => {setdark(!dark)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, width: '80%',  marginVertical: 20, }}>
                            <Title style={{ fontSize: 28,color: "#142B74" }}>Modo Escuro</Title>
                            <Column style={{ width: 70, height: 40, backgroundColor: dark ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                <Column style={{ width: 26, height: 26, backgroundColor: dark ? "#fff" : "#969696", borderRadius: 100, alignSelf: dark ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                            </Column>
                    </Pressable>


                    <Pressable onPress={() => {setfont(!font)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, width: '80%',   }}>
                            <Title style={{ fontSize: 28, color: "#142B74"}}>Fontes Grandes</Title>
                            <Column style={{ width: 70, height: 40, backgroundColor: font ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                <Column style={{ width: 26, height: 26, backgroundColor: font ? "#fff" : "#969696", borderRadius: 100, alignSelf: font ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                            </Column>
                    </Pressable>



                    <Pressable onPress={() => {sethd(!hd)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, width: '80%', marginVertical: 20, }}>
                            <Title style={{ fontSize: 28, color: "#142B74"}}>Imagens em HD</Title>
                            <Column style={{ width: 70, height: 40, backgroundColor: hd ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                <Column style={{ width: 26, height: 26, backgroundColor: hd ? "#fff" : "#969696", borderRadius: 100, alignSelf: hd ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                            </Column>
                    </Pressable>

                    
                    <Pressable onPress={() => {setgame(!game)}} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, width: '80%',   }}>
                            <Title style={{ fontSize: 28, color: "#142B74"}}>Modo Game</Title>
                            <Column style={{ width: 70, height: 40, backgroundColor: game ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                <Column style={{ width: 26, height: 26, backgroundColor: game ? "#fff" : "#969696", borderRadius: 100, alignSelf: game ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                            </Column>
                    </Pressable>
                    </MotiView>


                   <AnimatePresence>
                   <MotiView from={{translateY: 20, opacity: 0}} animate={{ translateY: 0, opacity: 1,}}>
                        <Pressable onPress={handleSave}  style={{ backgroundColor: "#00C6AE", paddingVertical: 12, paddingHorizontal: 32, marginTop: 50,position: 'absolute', bottom: -90, alignSelf: 'center', borderRadius: 100,}}>
                            <Title style={{ color: "#fff", fontSize: 28,  }}>Próximo</Title>
                        </Pressable>
                    </MotiView>
                   </AnimatePresence>
                </Column>}

                {screen == 4 && <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: "#FFE2BA", flex: 1, width: width,}}>
                    <MotiView from={{opacity: 0, translateY: -20}} animate={{opacity: 1, translateY: 0, }} transition={{ delay:300, duration: 500,}}>
                        <Title style={{ textAlign: 'center', color: "#142B74", fontSize: 52, marginBottom: 32 }}>Tudo pronto {'\n'}em um {'\n'}segundo...</Title>
                        <ActivityIndicator size={142} color="#142B74" />
                    </MotiView>
                </Column>}
            </Scroll>
        </Main>
    )
}