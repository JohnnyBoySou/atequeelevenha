
import React, { useContext, useRef, useState, useEffect } from 'react';
import { Column, Label, Main, Title, Scroll, Row } from '@theme/global';
import { FlatList, Pressable, Dimensions } from 'react-native';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import BottomSheet , { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { getShorts } from "@api/shorts";
import { AnimatePresence, MotiView, MotiImage } from "moti";
import { Video, ResizeMode } from 'expo-av';
const { width, height } = Dimensions.get('window');


export default function AudioDetailsPage({ }) {
    const transcricao = useRef(null);
    const author = useRef(null)
    const { color, theme, font } = useContext(ThemeContext);
    const [audios, setAudios] = useState();
   // const [item, setitem] = useState();

    useEffect(() => {
        getShorts().then((res) => {  setAudios(res);   }  ); 
    }, [])
    
    const video = useRef(null);
    const [isPlay, setisPlay] = useState(true);
    const [time, settime] = useState(0);
    const togglePlay = () => { if (isPlay) { video.current.pauseAsync(); setisPlay(false)} else {video.current.playAsync(); setisPlay(true)}}

    const item = {"desc": "Não desista daquilo que eu te convidei", "id": 7, "title": "O senhor diz para você hoje", "url": "https://i.pinimg.com/564x/99/39/71/993971125c50963c2167bb7714f83dc5.jpg", "video": "https://v1.pinimg.com/videos/mc/720p/5c/de/6a/5cde6a7880f8f874c0bff5a613764be9.mp4", 
    "author": {"id": 1, "name": "Sousa", "avatar": "https://i.pinimg.com/736x/90/9c/f1/909cf183ed41214de5f7b2d82c47e3a3.jpg", "bio": "“Sonhe como se fosse viver para sempre, viva como se fosse morrer hoje.”"}}

    return (
        <Main>
            <Column style={{ width: '170%', alignSelf: 'center', height: 600, borderRadius: 1000, backgroundColor: '#FFC79E', position: 'absolute', bottom: -100,   }}></Column>
            <Column style={{ width: '150%', alignSelf: 'center', height: 600, borderRadius: 1000, backgroundColor: '#FFE8D7', position: 'absolute', bottom: 170, zIndex: -2, }}></Column>
            <Scroll>
                <Column style={{ marginHorizontal: 20, marginBottom: 50,}}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
                            <Pressable style={{}}>
                                <Feather name="alert-circle" size={32} color={color.title} />
                            </Pressable>
                            <Pressable style={{}} onPress={() => {router.back()}} >
                                <Feather name="x" size={32} color={color.title} />
                            </Pressable>
                    </Row>

                    <Video ref={video} style={{ flex: 1, width: 1, height:  1, borderRadius: 12, backgroundColor: '#404040', }} source={{ uri: item?.video }} resizeMode={ResizeMode.COVER} isLoopingonLoad={() => {togglePlay(); setisPlay(!isPlay); }} posterSource={require('@assets/imgs/placeholder-video.png')} onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0)) } progressUpdateIntervalMillis={1}/>
                   
                    <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Title style={{ fontSize: 32, letterSpacing: -1, width: 300, textAlign: 'center', fontFamily: font.bold, }}>{item?.title}</Title>
                            <Pressable onPress={() => {author.current?.expand()}} >
                            <Row style={{ justifyContent: 'space-between', marginTop: 20, alignItems: 'center', backgroundColor: '#E26D5E', borderRadius: 100, padding: 4,}}>
                                <MotiImage source={{uri: item?.author?.avatar}} style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: "#ffffff90"}}/>
                                <Title style={{ fontSize: 16, letterSpacing: -1, textAlign: 'center', fontFamily: font.bold, color: "#fff", marginHorizontal: 12, }}>{item?.author?.name}</Title>
                            </Row>
                            </Pressable>
                    </Column>

                    <Pressable onPress={togglePlay} style={{ width: 220, marginHorizontal: 30, marginVertical: 100, justifyContent: 'center', alignItems: 'center',  alignSelf: 'center', backgroundColor: "#B2FFF6", height: 220, borderRadius: 1000, justifyContent: 'center', alignItems: 'center',  }}>
                        {isPlay ? 
                        <MotiView from={{ scale: 0.7,}} animate={{ scale: 1.1,}} >
                            <FontAwesome6 name="play" size={62} color="#000" />
                        </MotiView> : 
                        <MotiView from={{ scale: 0.6,}} animate={{ scale: 1.2,}} exit={{scale: 1,}}>
                            <FontAwesome6 name="pause" size={62} color="#000" />
                        </MotiView>
                        }
                    </Pressable>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, }}>
                        
                        <Pressable onPress={() => {transcricao.current?.expand()}}  style={{ marginRight: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 12, backgroundColor: "#ffffff90", borderRadius: 5, }}>
                            <Feather name="book" size={18} color={color.title} />
                            <Title style={{ fontSize: 18, marginLeft: 8, }}>Transcrição</Title>
                        </Pressable>
                        <Row>
                            <Pressable style={{ marginRight: 14, }}>
                                <Feather name="heart" size={28} color={color.title} />
                            </Pressable>
                            <Pressable style={{ marginRight: 20, }}>
                                <Feather name="share" size={28} color={color.title} />
                            </Pressable>
                        </Row>
                    </Row>

                    <Column style={{ flexGrow: 1, backgroundColor: color.primary+60, borderRadius: 100, }}>
                        <Column style={{ width: time+'%', height: 10, borderRadius: 100, backgroundColor: color.primary, zIndex: 99,  }}/>
                    </Column>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, }}>
                        <Title style={{ fontSize: 18, letterSpacing: -1, fontFamily: font.bold, }}>00:01</Title>
                        <Title style={{ fontSize: 18, letterSpacing: -1, fontFamily: font.bold, }}>03:20</Title>
                    </Row>
               
                </Column>                
            </Scroll>

            <BottomSheet ref={transcricao} snapPoints={[0.1, 800]} style={{borderRadius: 24, }} backgroundStyle={{borderRadius:24,}} handleStyle={{ backgroundColor: "#E26D5E", borderTopLeftRadius: 24, borderTopRightRadius: 24,}} handleIndicatorStyle={{ backgroundColor: "#BC4839", width: 80, height: 8,}} >
                <BottomSheetScrollView style={{ backgroundColor: "#E26D5E", paddingHorizontal: 20, paddingVertical: 10, }}>
                   
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
                        <Row style={{ justifyContent: 'space-between',  alignItems: 'center', backgroundColor: '#BC4839', borderRadius: 100, padding: 4,}}>
                            <MotiImage style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: "#ffffff90"}}/>
                            <Title style={{ fontSize: 16, letterSpacing: -1, textAlign: 'center', fontFamily: font.bold, color: "#fff", marginHorizontal: 12, }}>Sousa</Title>
                        </Row>
                        <Pressable onPress={() => {transcricao.current?.close()}} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10,  }}>
                            <Feather name="x" size={32} color="#FFF" />
                        </Pressable>

                    </Row>
                    <Title style={{ color: '#fff', fontSize: 28, fontFamily: font.book,marginVertical: 12, }}> 
                        Sonhe como se fosse viver para sempre, viva como se fosse morrer hoje.
                        {'\n'}
                        {'\n'}
                        É uma força que não tem muito como explicar, capaz de mover montanhas. 
                        {'\n'}
                        {'\n'}
                        É a esperança que não vacila diante das dificuldades e a confiança de que tudo fica bem quando se tem Deus no coração.
                    </Title>
                </BottomSheetScrollView>
            </BottomSheet>


            <BottomSheet ref={author} snapPoints={[0.1, 320]} style={{borderRadius: 24, }} backgroundStyle={{borderRadius:24,}} handleStyle={{ backgroundColor: "#FFE8D7", borderTopLeftRadius: 24, borderTopRightRadius: 24,}} handleIndicatorStyle={{ backgroundColor: "#E7C4AA", width: 80, height: 8,}} >
                <BottomSheetScrollView style={{ backgroundColor: "#FFE8D7", paddingHorizontal: 20, paddingVertical: 10, }}>
                    <MotiImage source={{uri: item?.author?.avatar}} style={{ width: 142, height: 142, borderRadius: 100, backgroundColor: "#ffffff90", alignSelf: 'center',}}/>
                    <Title style={{ fontSize: 24, letterSpacing: -1, textAlign: 'center', fontFamily: font.bold,  marginHorizontal: 12, marginTop: 10, }}>{item?.author?.name}</Title>
                    <Label style={{ fontSize: 24, }}>{item?.author?.bio}</Label>
                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}


/**  
                   {!isPlay && <Row style={{ justifyContent: 'center', alignItems: 'center',  marginVertical: 50, position: 'absolute', top: 120, left: 20,}}>
                        <MotiView style={{ width: 20, backgroundColor: "#303030", borderRadius: 100, height: 100, alignSelf: 'center', }} 
                            from={{height: 100,}} 
                            animate={{height: 30}} 
                            exit={{height: 100}}
                            transition={{ loop: true, type: 'timing', duration: 1200, delay: 100,  }}/>
                    </Row>
                    }
 */