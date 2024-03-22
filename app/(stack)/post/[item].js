import React, { useContext, useEffect, useRef, useState } from 'react';
import { Column, Row, Title, Label, Scroll, Main, Spacer } from '../../theme/global';
import { Image, TouchableOpacity, Dimensions, FlatList, Pressable } from 'react-native';
import { AntDesign, FontAwesome5, Feather, Ionicons, Fontisto, FontAwesome } from '@expo/vector-icons';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { ThemeContext } from 'styled-components/native';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PostPage( ) {
    const { it } = useLocalSearchParams();
    const item = JSON.parse(it)
    const [porcentage, setporcentage] = useState(0);
    const { color, font} = useContext(ThemeContext);

    const lastDays = [
        {day: "7 de Março", cl: '#8A96FF'},
        {day: "6 de Março", cl: '#00C6AE'},
        {day: "5 de Março", cl: '#0096C6'},
        {day: "4 de Março", cl: '#7000FF'},
    ]

    const [complete, setComplete] = useState(false);
    const ScrollPorcentage = ({ contentSize, contentOffset, layoutMeasurement }) => { 
        const value =  (contentOffset.y / (contentSize.height - layoutMeasurement.height) * 100) + 0.1;
        setporcentage(value);
        if(value.toFixed() >= 99){
            setComplete(true);
        }
     }
     if(item?.title == undefined){
            return <></>
    }
 return (
        <Main>
              <Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, backgroundColor: color.primary, paddingVertical: 24, borderBottomRightRadius: 16,}}>
                    <Title style={{fontSize: 32, color: "#f7f7f7",}}>{item.title}</Title>
                    <Label style={{fontSize: 24, color: "#f7f7f7", }}>{item.time}</Label>
                </Row>
                <Row style={{ marginTop: -2, }}>
                
                    <Column style={{  paddingHorizontal: 20, backgroundColor: color.primary, paddingBottom: 20, borderBottomRightRadius: 16,}}>
                        {complete ? 
                            <MotiView from={{translateX: 20, opacity: 0.5}} animate={{ translateX: 0, opacity: 1,}} style={{ marginRight: -14, marginBottom: 2, }}>
                                <Title style={{ color: "#f7f7f7", }}>Parabéns! </Title>
                                <Label style={{ color: "#f7f7f7", fontSize: 20, }}>Você completou mais um dia! {"\n"}Bora compartilhar com um amigo        </Label> 
                            </MotiView>
                            : <>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
                            <Title style={{ opacity: 0.7, }}>Progresso</Title>
                            <Pressable style={{ backgroundColor:"#000", borderRadius: 12, borderBottomRightRadius: 0, paddingVertical: 6, paddingHorizontal:12, }}>
                                <Label>{porcentage.toFixed(0)}%</Label>
                            </Pressable>
                        </Row>

                        <Row style={{ backgroundColor: "#ffffff30",  borderRadius: 100, width: 250, }}>
                            <Column style={{ width: porcentage.toFixed(0) + '%', height: 20, borderRadius: 100, backgroundColor: "#fff", }}/>
                        </Row>
                        </>}
                    </Column>
                    <Pressable onPress={() => router.back()} style={{ flexGrow: 1, backgroundColor: color.secundary, borderRadius: 16, borderTopLeftRadius: 0, justifyContent: 'center', alignItems: 'center', }}>
                        <AntDesign name="arrowleft" size={34} color="#000" />
                    </Pressable>
                </Row>
                </Column>
            <Scroll  onScroll={(event) => ScrollPorcentage(event.nativeEvent)}>
              

                
                <Column style={{ padding: 42, }}>
                    <Label style={{ fontSize: 24, lineHeight: 30, }}>"{item?.versiculo}"</Label>
                    <Label style={{ fontSize: 20, lineHeight: 26, textAlign: 'right',}}>{item?.versiculoCaption}</Label>
                </Column>
                <Pressable style={{ paddingHorizontal: 32, paddingVertical: 12, backgroundColor: "#fff", borderRadius: 100, alignSelf: 'center' }}>
                    <Label style={{ color: "#000" }}>Amém</Label>
                </Pressable>
                
                <Column style={{ padding: 42, }}>
                    <Label style={{ fontSize: 24, lineHeight: 30, }}>{item?.desc}</Label>
                    <Row style={{ position: 'relative', marginBottom: 300, marginTop: 40, justifyContent: 'center', }}>
                        <MotiImage source={{ uri: item.imgs[1]}} style={{ width: 300, top: 10, right: -20,  height: 240, backgroundColor: "#404040", position: 'absolute', borderRadius: 32, transform: [{rotate: '12deg'}] }}/> 
                        <MotiImage source={{ uri: item.imgs[0]}}  style={{ width: 300, height: 240, borderWidth: 6, borderColor: "#161616", backgroundColor: "#E26D5E", position: 'absolute', borderRadius: 32, transform: [{rotate: '0deg'}], justifyContent: 'center', alignItems: 'center',  }}></MotiImage>
                    </Row>
                    <Label style={{ fontSize: 24, lineHeight: 30, }}>{item?.desc2}</Label>
                </Column>

                <Column style={{ backgroundColor: color.primary, paddingVertical: 32, borderRadius: 32, paddingHorizontal: 20, }}>
                    <Title style={{ fontSize: 52, fontFamily: font.book, color: "#f7f7f7", }}>Mais um dia {"\n"}Completo</Title>
                    <Label style={{ color: "#f7f7f7", fontSize: 20, }}>Mas isso é só o começo viu, tem muito por vir!</Label>
                    <Spacer height={20}/>
                    <Title style={{ color: "#f7f7f7", }}>Veja novamente</Title>

                    <FlatList
                        data={lastDays}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        style={{ marginHorizontal: -20, paddingHorizontal: 20, }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable key={index} style={{ padding: 20, width: 132, backgroundColor: item?.cl, borderRadius: 16, marginVertical: 10, marginRight: 16, }}>
                            <Title style={{ textAlign: 'center', }}>{item.day}</Title>
                        </Pressable>
                        )}
                    />

                    <Spacer height={20}/>
                    <Title style={{ color: "#f7f7f7", }}>Nós siga nas redes sociais</Title>
                    
                    <Spacer height={20}/>
                    <Title style={{ color: "#f7f7f7", }}>Continue</Title>
                    <Spacer height={12}/>
                    <Row>
                        <Pressable style={{ borderWidth: 2, borderColor: "#fff", backgroundColor: "#ffffff30", borderRadius: 100, flexGrow: 1, paddingVertical: 14, justifyContent: 'center', alignItems: 'center',  }}>
                            <Label style={{ textAlign: 'center', color: "#fff", fontSize: 24,}}>Anterior</Label>
                        </Pressable>
                        <Spacer width={20}/>   
                        <Pressable style={{ borderWidth: 2, opacity: 0.5, borderColor: "#fff", backgroundColor: "#ffffff30", borderRadius: 100, flexGrow: 1, paddingVertical: 14, justifyContent: 'center', alignItems: 'center',  }}>
                            <Label style={{ textAlign: 'center', color: "#fff", fontSize: 24,}}>Próximo</Label>
                        </Pressable>
                    </Row>

                </Column>
                <Spacer height={40}/>
             </Scroll>
        </Main>
    );
}