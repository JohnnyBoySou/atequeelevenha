import React, { useContext, useRef, useState, useEffect } from 'react';
import { Column, Label, Main, Title, Scroll, Row } from '@theme/global';
import { FlatList, Pressable, Dimensions, Image, Linking} from 'react-native'; 
import { ThemeContext } from 'styled-components/native';
import { router, useLocalSearchParams } from 'expo-router';
import BottomSheet , { BottomSheetScrollView } from '@gorhom/bottom-sheet'; 
import { AnimatePresence, MotiView, MotiImage } from "moti";
import { AntDesign } from '@expo/vector-icons';
import { AudioWaveform, ArrowDownToLine, Share2, Heart} from 'lucide-react-native'
import { getPlaylists } from '@api/playlists';
const { width, height } = Dimensions.get('window');
import { Entypo } from '@expo/vector-icons';

export default function AudioPage({ }) {
    const detailsItem = useRef(null); 
    const playlistMore = useRef(null); 
    const [initial, setinitial] = useState(false);
    const [data, setData] = useState([]);
    const [cache, setCache] = useState();
    const { color, theme, font } = useContext(ThemeContext);
    useEffect(() => {
        //getShorts().then((res) => {  setAudios(res); setitem(res[2]); console.log(res[2])}); 
        const requestData = () => {
            getPlaylists().then((res) => {  setData(res); });
        }
        requestData()
    }, [])

    const audios = [
        {
            id: 1,
            title: 'O que temos de bom para hoje...',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            image: 'https://i.pinimg.com/564x/3a/41/e6/3a41e69b86e2e9314d8aa7cc299ebcfe.jpg',
            duration: '2 min',
            date: '12, Jun de 2024',
        },
        {
            id: 2,
            title: 'Uma nova manhã, um novo dia!',
            audio: 'https://v1.pinimg.com/videos/mc/720p/97/50/25/9750254108ef94a89c3a76d1b4f5a430.mp4',
            image: 'https://i.pinimg.com/564x/23/54/4e/23544e1292fc51277d47c8f5e87350f0.jpg',
            duration: '2 min',
            date: '24, Jun de 2024',
            author: {
                name:'João',	
                avatar: 'https://i.pinimg.com/564x/16/5d/4a/165d4a5572877d85a184826d297ea447.jpg',
            }
        },
       
    ]

    const handlePlaylist = (item) => {
        console.log(item)
        setCache(item)
        playlistMore.current?.expand();
    }

    const handleSpotify = async () => {
        await Linking.openURL(cache?.link);
    }

    if(!initial){
        return (
            <Main>
                <Column style={{ width: '200%', height: 700, borderRadius: 1000, backgroundColor: '#FFE8D7', position: 'absolute', bottom: -200, left: 20, }}></Column>
                <Scroll>
                    <Column style={{ marginHorizontal: 20, marginBottom: 50,}}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Title style={{ marginVertical: 20, fontSize: 32, fontFamily: font.bold }}>Descubra</Title>
                            <Heart color='red' size={24}/>
                        </Row>
                        <Title style={{ }}>Playlist's cristães</Title>
                        <FlatList 
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <CardRow item={item} onPress={() => handlePlaylist(item)}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={<Pressable  style={{ marginLeft: 20, }}><Label style={{ color: color.primary, fontSize: 16, }}></Label></Pressable>}
                            style={{ marginHorizontal: -20, marginTop: 12,}}
                        />
                        <Title style={{ marginTop: 20, }}>Novos áudios fresquinhos!</Title>
                        <FlatList 
                            data={audios}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <CardList item={item} />}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </Column>      
                </Scroll>

                <BottomSheet ref={playlistMore} snapPoints={[0.1, 410]} handleStyle={{backgroundColor: color.off+60, }} >
                    <BottomSheetScrollView style={{ backgroundColor: color.off+60, flex: 1,}}>
                        <Column  style={{ flex: 1, marginHorizontal: 12, marginBottom: 20,}}>
                            <Image source={{ uri: cache?.image }} blurRadius={20} style={{ width: '100%', height: 370, borderRadius: 24, opacity: 0.9,  zIndex: -99, position: 'absolute', top: 0,  }}/>
                            <MotiImage from={{scale: 0.5, }} animate={{scale: 1, opacity: 1}} transition={{type: 'timing'}} source={{ uri: cache?.image }} style={{ width: 200, height: 200, borderRadius: 12, marginVertical: 24,  zIndex: 1,  alignSelf: 'center'}} />
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <Title style={{ marginBottom: 10, fontSize: 32, color: "#fff",}}>{cache?.title}</Title>
                                <Title style={{ marginBottom: 10, marginLeft: 12, fontSize: 16, backgroundColor: "#fff", borderRadius: 100, paddingVertical: 6, opacity: .9, paddingHorizontal: 18, }}>{cache?.tag}</Title>
                            </Row>
                            
                            <Pressable onPress={handleSpotify} style={{ flexDirection: 'row',  backgroundColor: "#141414", borderRadius: 100, paddingVertical: 8, opacity: .9, paddingHorizontal: 22, alignSelf: 'center', marginTop: 12, }}>
                                <Title style={{ marginRight: 12, fontSize: 18, color: "#fff"}}>Abrir no Spotify</Title>
                                <Entypo name="spotify" size={24} color="#fff" />
                            </Pressable>

                        </Column>
                    </BottomSheetScrollView>
                </BottomSheet>

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
    else{
        return (<First/>);
    }
}




const Card = ({item, color}) => {
    return(
        <Pressable  style={{ backgroundColor: "#00000010", borderRadius: 18, flexGrow: 1, padding: 20, marginHorizontal: 20, marginVertical: 6, flexDirection: 'row' }}>
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
        <Pressable onPress={() => router.push({pathname: '/(stack)/audio/[item]', params: { it: JSON.stringify(item), }})} style={{  marginVertical: 10, flexDirection: 'row',  alignItems: 'center', }}>
            <Image source={{uri: item.image}} style={{ width: 74, height: 74, borderRadius: 6,  }}/>
            <Column style={{ marginLeft: 10, }}>
                <Title style={{ fontSize: 18,  }}>{item?.title.slice(0, 24)}</Title>
                <Label style={{ fontSize: 15, opacity: 0.8, }}>{item.duration} * {item.date}</Label>
            </Column>
        </Pressable>
    )}
    

const CardRow = ({item, onPress}) => {
return(
    <Pressable style={{  marginLeft: 20, }} onPress={onPress} >
        <Image source={{uri: item.image}} style={{ width: 142, height: 142, borderRadius: 6, marginBottom: 6, }}/>
        <Title style={{ fontSize: 16, opacity: 0.8, }}>{item?.title.slice(0, 24)}</Title>
    </Pressable>
)}


const First = () => {
return(
        <Column style={{ paddingVertical: 40, backgroundColor: "#FFF4EB", flex: 1,}}>
            <MotiImage source={require('@assets/imgs/audio_banner.png')} style={{ width: '100%', height: 500, }}/>
            <Column style={{  marginHorizontal: 20, }}>
                <Title style={{ fontSize: 32, fontFamily: 'Font_Bold', marginTop: -20, }}>Mensagens especiais {'\n'}para todos!</Title>
                <Label>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</Label>
                <Row style={{ marginTop: 12, }}>
                    <Column style={{ borderWidth: 2, borderColor: "#3F59AE", borderRadius: 12, width: 94, height: 94, justifyContent: 'center', alignItems: 'center', backgroundColor: "#3F59AE20", }}>
                        <AudioWaveform size={24} color='#3F59AE' strokeWidth={2}/>
                        <Label style={{ fontSize: 14, fontFamily: 'Font_Medium',  textAlign: 'center'}}>Audios de Qualidade</Label>
                    </Column>
                    <Column style={{ borderWidth: 2, marginHorizontal: 12, borderColor: "#FE7471", borderRadius: 12, width: 94, height: 94, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FE747120", }}>
                        <ArrowDownToLine size={24} color='#FE7471' strokeWidth={2}/>
                        <Label style={{ fontSize: 14, color: "#FE7471", fontFamily: 'Font_Medium', textAlign: 'center' }}>Baixe {'\n'}de graça</Label>
                    </Column>
                    <Column style={{ borderWidth: 2, borderColor: "#09CDB5", borderRadius: 12, width: 94, height: 94, justifyContent: 'center', alignItems: 'center', backgroundColor: "#09CDB520", }}>
                        <Share2  size={24} color='#09CDB5' strokeWidth={2}/>
                        <Label style={{ fontSize: 14, color: "#09CDB5", fontFamily: 'Font_Medium', textAlign: 'center' }}>Compartilhe com todos</Label>
                    </Column>
                </Row>
                <Pressable style={{  }}>
                    <Label style={{ color: '#fff', paddingVertical: 12, backgroundColor: "#E26D5E", textAlign: 'center', paddingHorizontal: 24, borderRadius: 12, marginTop: 20, }}>Ouvir agora</Label>
                </Pressable>
            </Column>
        </Column>
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