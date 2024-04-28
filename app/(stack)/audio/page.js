import React, { useContext, useRef, useState, useEffect } from 'react';
import { Column, Label, Main, Title, Scroll, Row } from '@theme/global';
import { FlatList, Pressable, Dimensions, Image } from 'react-native'; 
import { ThemeContext } from 'styled-components/native';
import { router, useLocalSearchParams } from 'expo-router';
import BottomSheet , { BottomSheetScrollView } from '@gorhom/bottom-sheet'; 
import { AnimatePresence, MotiView, MotiImage } from "moti";
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

export default function AudioPage({ }) {
    const detailsItem = useRef(null); 
    const { color, theme, font } = useContext(ThemeContext);
    useEffect(() => {
        //getShorts().then((res) => {  setAudios(res); setitem(res[2]); console.log(res[2])}); 
    }, [])

    const audios = [
        {
            id: 1,
            title: 'O que temos de bom para hoje...',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            capa: 'https://i.pinimg.com/564x/3a/41/e6/3a41e69b86e2e9314d8aa7cc299ebcfe.jpg',
            duration: '2 min',
            date: '12, Junho de 2024',
        },
        {
            id: 2,
            title: 'Uma nova manhã, um novo dia!',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            capa: 'https://i.pinimg.com/564x/23/54/4e/23544e1292fc51277d47c8f5e87350f0.jpg',
            duration: '2 min',
            date: '24, Junho de 2024',
        },
        {
            id: 3,
            title: 'O que temos de bom para hoje...',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            capa: 'https://i.pinimg.com/564x/1d/73/3c/1d733ca062d3421d00e9e7d3455a80bb.jpg',
            duration: '2 min',
            date: '12, Junho de 2024',
        },
        {
            id: 4,
            title: 'O que temos de bom para hoje...',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            capa: 'https://i.pinimg.com/564x/a4/91/1d/a4911d3ab57a22d92e5043115d8fd75b.jpg',
            duration: '2 min',
            date: '12, Setembro de 2024',
        },
        {
            id: 5,
            title: 'O que temos de bom para hoje...',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            capa: 'https://i.pinimg.com/564x/af/d7/21/afd72193707a60a37ba36cc0c415fb0b.jpg',
            duration: '2 min',
            date: '12, Abril de 2024',
        },
    ]

    return (
        <Main>
            <Column style={{ width: '200%', height: 700, borderRadius: 1000, backgroundColor: '#FFE8D7', position: 'absolute', bottom: -200, left: 20, }}></Column>
            <Scroll>
                <Column style={{ marginHorizontal: 20, marginBottom: 50,}}>
                    <Title style={{ marginVertical: 20, fontSize: 32, fontFamily: font.bold }}>Descubra</Title>
                    <Title style={{ }}>Playlist's</Title>
                    <FlatList 
                        data={audios}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <CardRow item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginHorizontal: -20, marginTop: 12,}}
                    />
                    <Title style={{ marginTop: 20, }}>Novos áudios fresquinhos!</Title>
                    <FlatList 
                        data={audios}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <CardList item={item} />}
                        showsHorizontalScrollIndicator={false}
                    />
                </Column>      
            </Scroll>

            <BottomSheet ref={detailsItem} snapPoints={[0.1, 600]} handleStyle={{backgroundColor: color.off+60, }} >
                <BottomSheetScrollView style={{ backgroundColor: color.off+60, }}>
                    <Column >
                    <Title style={{ marginBottom: 10, marginHorizontal: 20, fontSize: 32, }}>Todos</Title>
                    <FlatList
                        data={audios}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Card item={item} color={color}/>}
                    />
                    </Column>
                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}


const Card = ({item, color}) => {
    return(
        <Pressable onPress={() => {router.navigate('')}}  style={{ backgroundColor: "#00000010", borderRadius: 18, flexGrow: 1, padding: 20, marginHorizontal: 20, marginVertical: 6, flexDirection: 'row' }}>
            <Row style={{  alignItems: 'center',   marginTop: 0, marginBottom: -10,}}>
                <MotiImage from={{scale: 0.5, }} animate={{scale: 1, opacity: 1}} transition={{type: 'timing'}} source={{ uri: item.capa }} style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 12,  zIndex: 1,}} />
                <MotiView from={{transform: [{translateX: -100,}], opacity: 0}} animate={{transform: [{translateX: -50,}], opacity: 1}} transition={{type: 'timing'}}   style={{ width: 80, height: 80, borderRadius: 100, marginBottom: 12, backgroundColor: color.secundary,}} />
            </Row>
            <Column style={{ width: '44%',marginLeft: -30, marginTop: 6, }}>
                <Title style={{ fontSize: 20, }}>{item?.title}</Title>
                <Label style={{ marginBottom: 6, }}>{item?.duration}</Label>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                    <Pressable>
                    <AntDesign name="hearto" size={24} color={color.red} />
                    </Pressable>
                    <Pressable style={{ backgroundColor: color.primary, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100,  }}>
                        <Label style={{ color: "#fff", }}>Ouvir</Label>
                    </Pressable>
                </Row>
            </Column>
        </Pressable>
    );
}


const CardList = ({item}) => {
    return(
        <Pressable style={{  marginVertical: 10, flexDirection: 'row',  alignItems: 'center', }}>
            <Image source={{uri: item.capa}} style={{ width: 74, height: 74, borderRadius: 6,  }}/>
            <Column style={{ marginLeft: 10, }}>
                <Title style={{ fontSize: 18,  }}>{item?.title.slice(0, 24)}</Title>
                <Label style={{ fontSize: 15, opacity: 0.8, }}>{item.duration} * {item.date}</Label>
            </Column>
        </Pressable>
    )}
    

const CardRow = ({item}) => {
return(
    <Pressable style={{  marginLeft: 20, }}>
        <Image source={{uri: item.capa}} style={{ width: 82, height: 82, borderRadius: 6, marginBottom: 6, }}/>
        <Title style={{ fontSize: 16, opacity: 0.8, }}>{item?.title.slice(0, 8)}</Title>
    </Pressable>
)}



/**
 *  <Pressable onPress={() => {detailsItem.current?.expand()}}  style={{ borderWidth: 1, borderColor: color.primary+70,  borderRadius: 18, flexGrow: 1, paddingVertical: 24, }}>
                            <Title style={{ textAlign: 'center', fontSize: 32, marginBottom: 4, }}>Bom dia!</Title>
                            <Label style={{ textAlign: 'center',  marginBottom: 12,}}>12 audios -  20 min</Label>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '-32deg',}]}} animate={{scale: 1, opacity: 1,  transform: [{rotate: '-12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/3a/41/e6/3a41e69b86e2e9314d8aa7cc299ebcfe.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '-12deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0,}} animate={{scale: 1, opacity: 1,}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/07/1a/ae/071aae5869bff4ed73867fd9691371ff.jpg' }} style={{ width: 90, height: 100, borderRadius: 12, marginHorizontal: -30, zIndex: 99, transform: [{rotate: '0deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '32deg',}]}} animate={{scale: 1, opacity: 1, transform: [{rotate: '12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/fc/60/96/fc609601bddd4dc669909bbaefd2b250.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '12deg',}]}} />
                            </Row>
                        </Pressable>
                        <Pressable onPress={() => {detailsItem.current?.expand()}}  style={{ borderWidth: 1, borderColor: color.primary+70,  borderRadius: 18, flexGrow: 1, paddingVertical: 24, marginVertical: 20, }}>
                            <Title style={{ textAlign: 'center', fontSize: 32, marginBottom: 4, }}>Palavra de Deus</Title>
                            <Label style={{ textAlign: 'center',  marginBottom: 12,}}>8 audios -  15 min</Label>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '-32deg',}]}} animate={{scale: 1, opacity: 1,  transform: [{rotate: '-12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/3a/41/e6/3a41e69b86e2e9314d8aa7cc299ebcfe.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '-12deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0,}} animate={{scale: 1, opacity: 1,}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/07/1a/ae/071aae5869bff4ed73867fd9691371ff.jpg' }} style={{ width: 90, height: 100, borderRadius: 12, marginHorizontal: -30, zIndex: 99, transform: [{rotate: '0deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '32deg',}]}} animate={{scale: 1, opacity: 1, transform: [{rotate: '12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/fc/60/96/fc609601bddd4dc669909bbaefd2b250.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '12deg',}]}} />
                            </Row>
                        </Pressable>
                        <Pressable onPress={() => {detailsItem.current?.expand()}}  style={{ borderWidth: 1, borderColor: color.primary+70,  borderRadius: 18, flexGrow: 1, paddingVertical: 24, }}>
                            <Title style={{ textAlign: 'center', fontSize: 32, marginBottom: 4, }}>Boa noite!</Title>
                            <Label style={{ textAlign: 'center',  marginBottom: 12,}}>15 audios -  25 min</Label>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '-32deg',}]}} animate={{scale: 1, opacity: 1,  transform: [{rotate: '-12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/3a/41/e6/3a41e69b86e2e9314d8aa7cc299ebcfe.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '-12deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0,}} animate={{scale: 1, opacity: 1,}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/07/1a/ae/071aae5869bff4ed73867fd9691371ff.jpg' }} style={{ width: 90, height: 100, borderRadius: 12, marginHorizontal: -30, zIndex: 99, transform: [{rotate: '0deg',}]}} />
                                <MotiImage from={{scale: 0, opacity: 0, transform: [{rotate: '32deg',}]}} animate={{scale: 1, opacity: 1, transform: [{rotate: '12deg',}]}} transition={{type: 'timing'}} source={{ uri: 'https://i.pinimg.com/564x/fc/60/96/fc609601bddd4dc669909bbaefd2b250.jpg' }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 12, transform: [{rotate: '12deg',}]}} />
                            </Row>
                        </Pressable>
 */