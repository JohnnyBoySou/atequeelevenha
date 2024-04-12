
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
    const adjustDate = useRef(null);
    const { color, theme } = useContext(ThemeContext);
    const [audios, setAudios] = useState();
    const [item, setitem] = useState();

    useEffect(() => {
        getShorts().then((res) => {  setAudios(res); setitem(res[2]); console.log(res[2])  }  ); 
    }, [])
    
    const video = useRef(null);
    const [isPlay, setisPlay] = useState(true);
    const [time, settime] = useState(0);
    const togglePlay = () => { if (isPlay) { video.current.pauseAsync(); setisPlay(false)} else {video.current.playAsync(); setisPlay(true)}}

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: 20, marginBottom: 50,}}>
                    <Video ref={video} style={{ flex: 1, width: 1, height:  1, borderRadius: 12, backgroundColor: '#404040', }} source={{ uri: item?.video }} resizeMode={ResizeMode.COVER} isLoopingonLoad={() => {togglePlay(); setisPlay(!isPlay); }} posterSource={require('@assets/imgs/placeholder-video.png')} onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0)) } progressUpdateIntervalMillis={1}/>
                    
                   {!isPlay && <Row style={{ justifyContent: 'center', alignItems: 'center',  marginVertical: 50, position: 'absolute', top: 120, left: 20,}}>
                        <MotiView style={{ width: 20, backgroundColor: "#303030", borderRadius: 100, height: 100, alignSelf: 'center', }} 
                            from={{height: 100,}} 
                            animate={{height: 30}} 
                            exit={{height: 100}}
                            transition={{ loop: true, type: 'timing', duration: 1200, delay: 100,  }}/>
                    </Row>
                    }

                    <MotiImage source={{ uri: item?.url }} style={{ width: 170, height: 170, borderRadius: 12, alignSelf: 'center',}} />
                    
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, }}>
                        <Column >
                            <Title style={{ fontSize: 28, letterSpacing: 0, width: 300, }}>{item?.title}</Title>
                            <Label style={{ color: color.label, fontSize: 20, marginTop: 4, }}>{item?.desc}</Label>
                        </Column>
                        <Pressable style={{ marginRight: 20, }}>
                            <AntDesign name="heart" size={32} color={color.title} />
                        </Pressable>
                    </Row>

                    <Column style={{ flexGrow: 1, backgroundColor: color.primary+60, }}>
                        <Column style={{ width: time+'%', height: 10, borderRadius: 100, backgroundColor: color.primary, zIndex: 99,  }}/>
                    </Column>

                    
                    <Row style={{ alignItems: 'center', alignSelf: 'center', marginTop: 20,  }}>
                    <Pressable style={{ width: 64, height: 64, borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  borderColor: color.primary+90, }}>
                        <AntDesign name='arrowleft' size={32} color={color.title} />
                    </Pressable>
                    <Pressable onPress={togglePlay} style={{ width: 120, marginHorizontal: 30, backgroundColor: color.primary, height: 120, borderRadius: 1000, justifyContent: 'center', alignItems: 'center',  }}>
                        {isPlay ? 
                        <MotiView from={{ scale: 0.7,}} animate={{ scale: 1.1,}} >
                            <FontAwesome6 name="play" size={42} color="#fff" />
                        </MotiView> : 
                        <MotiView from={{ scale: 0.6,}} animate={{ scale: 1.2,}} exit={{scale: 1,}}>
                            <FontAwesome6 name="pause" size={42} color="#fff" />
                        </MotiView>
                        }
                    </Pressable>
                    <Pressable style={{ width: 64, height: 64, borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center',  borderColor: color.primary+90, }}>
                        <AntDesign name='arrowright' size={32} color={color.title} />
                    </Pressable>
                    </Row>
                </Column>                
            </Scroll>

            <BottomSheet ref={adjustDate} snapPoints={[0.1,  480]} style={{ backgroundColor: color.background, }} >
                <BottomSheetScrollView style={{ backgroundColor: color.background, }}>

                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}
