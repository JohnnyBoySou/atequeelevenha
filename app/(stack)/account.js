import React, { useContext, useEffect, useState } from 'react';
import { Column, Row, Title, Label, Scroll, Main, Spacer } from '@theme/global';
import { Image, Dimensions, Pressable, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

export default function NotificationsPage({ }) {
    const {color, font} = useContext(ThemeContext);
    const [user, setuser] = useState();
 
    useEffect(() => {
        const fecthUser = async () => {
            const user = await AsyncStorage.getItem('user')
            setuser(JSON.parse(user))
        }
        fecthUser()
    }, [])

 return (
        <Main>
            <Image blurRadius={10} source={require('@assets/imgs/account.png')} style={{ width: '100%', height: '110%', position: 'absolute', top: 0, left: 0, paddingVertical: 40, }} />
            <Scroll >
                <Column style={{  paddingHorizontal: 20, paddingBottom: 32, }}>
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100,}}>
                        <AntDesign name="arrowleft" size={32} color={color.title} />
                    </Pressable>

                        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Image source={{ uri: user?.avatar }} style={{ width: 145, height: 145, borderRadius: 100,  borderWidth: 4, borderColor: "#fff",}} />
                            <Title style={{ lineHeight: 26, fontSize: 28, zIndex: 99, marginTop: 14,}}>{user?.nome}</Title>
                            <Label>{user?.email}</Label>
                        </Column>

                    <Row style={{ marginTop: 24, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Row style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, flexGrow: 1, paddingHorizontal: 12,}}>
                            <Column style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: color.green+80, }}/>
                            <Column style={{ marginLeft: 8, justifyContent: 'center',  }}>
                                <Title style={{ fontSize: 24,  color: color.green,}}>4 dias</Title>
                                <Label style={{ marginTop: -4, }}>Sem faltar</Label>
                            </Column>
                        </Row>
                        <Spacer/>
                        <Row style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, flexGrow: 1, paddingHorizontal: 12,}}>
                            <Column style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: color.red+80, }}/>
                            <Column style={{ marginLeft: 8, justifyContent: 'center',  }}>
                                <Title style={{ fontSize: 24,  color: color.red,}}>26 dias</Title>
                                <Label style={{ marginTop: -4, }}>Restantes</Label>
                            </Column>
                        </Row>
                    </Row>
                
                    <Row style={{ marginTop: 20, }}>
                        <Pressable style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#000", borderRadius: 100, }}>
                            <Label style={{ color: "#fff", }}>Progresso</Label>
                        </Pressable>
                    </Row>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                        <Column style={{ flexGrow: 1, height: 280, borderRadius: 24, backgroundColor: "#F7F7F7",  marginRight: 4, }}/>
                        <Column>
                            <Column style={{ width: 150, borderRadius: 24, backgroundColor: "#303030", height: 140, }}/>
                            <Column style={{ flexGrow: 1, borderRadius: 24, backgroundColor: "#d7d7d7", height: 140, marginTop: 4, }}/>
                        </Column>

                    </Row>
                    
                </Column>
             </Scroll>
        </Main>
    );
}