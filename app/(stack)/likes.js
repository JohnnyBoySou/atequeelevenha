import React, { useState, useEffect, useContext, useRef } from 'react';
import { Column, Row, Main, Scroll, Title, Spacer, Label, } from '@theme/global';
import { Pressable, Image, FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { listPins } from '@hooks/usePin';
import { listShorts } from '@hooks/useShorts';
import { AnimatePresence, MotiView } from "moti";

import { Video, ResizeMode } from 'expo-av';
export default function Likes() {
    const { color, font } = useContext(ThemeContext)
    const [type, settype] = useState('pins');
    const [pins, setpins] = useState([]);
    const [shorts, setshorts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
                const pinsResponse = await listPins();
                const shortsResponse = await listShorts();
                
                setpins(pinsResponse);
                setshorts(shortsResponse);
           
        }
        fetchData();
    }, []);

    const Shorts = ({ item }) => {

        const video = useRef(null);
        const [isPlay, setisPlay] = useState(true);
        const [time, settime] = useState(0);

        const togglePlay = () => { if (isPlay) { video.current.pauseAsync(); setisPlay(false) } else { video.current.playAsync(); setisPlay(true) } }

        return (
            <Column style={{ marginBottom: 30, }}>
                <Column style={{ width: time + '%', height: 5, position: 'absolute', top: 0, borderRadius: 100, backgroundColor: "#fff", zIndex: 99, }} />
                <Video
                    ref={video}
                    style={{ flex: 1, width: '100%', height: 500, borderRadius: 12, backgroundColor: '#404040', }}
                    source={{ uri: item?.video }}
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    onLoad={() => { togglePlay(); setisPlay(!isPlay); }}
                    posterSource={require('@assets/imgs/placeholder-video.png')}
                    onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0))}
                    progressUpdateIntervalMillis={50}
                />
                <Pressable style={{ width: 300, height: 500, backgroundColor: "#30303000", position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', marginLeft: 30,}} onPress={() => { togglePlay(); setisPlay(!isPlay) }}>
                    <AnimatePresence>
                        {isPlay ?
                            <MotiView from={{ opacity: 1, }} animate={{ opacity: 0, }}>
                                <FontAwesome6 name="play" size={42} color="#fff" />
                            </MotiView> :
                            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }}>
                                <FontAwesome6 name="pause" size={42} color="#fff" />
                            </MotiView>
                        }
                    </AnimatePresence>
                </Pressable>
            </Column>
        )
    }

    const Pin = ({ post }) => {
        const [aspectRatio, setAspectRatio] = useState();
        Image.getSize(post.image, (width, height) => {
            setAspectRatio(width / height)
        })
        return (
            <Image
                source={{ uri: post.image }}
                style={[{ borderRadius: 12, marginBottom: 30, width:'100%' }, { aspectRatio }]}
            />
        )
    }




    const Load = () => {
    return(
        <Column>
        <Column style={{ width: 140, height: 220, alignSelf: 'center', borderWidth: 2, borderColor: "#30303050", borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 60, }} >
            <AntDesign name="heart" size={64} color={color.primary} />
        </Column>
        <Column style={{ width: 100, height: 10, alignSelf: 'center', backgroundColor: "#30303050", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, }} />
        <Column style={{ width: 60, height: 10, alignSelf: 'center', backgroundColor: "#30303030", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, }} />
        <Label style={{ textAlign: 'center', fontSize: 24, marginTop: 20, fontFamily: font.medium, }}>Nada por aqui...</Label>
        <Label style={{ textAlign: 'center', fontSize: 20, }}>Clique no ícone de coração {'\n'}para salvar, eles aparecerão aqui!</Label>
    </Column>
        )}
    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: 20, }}>
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100, marginTop: 10, borderWidth: 1, borderColor: "#30303030", justifyContent: 'center', alignItems: 'center',  }}>
                        <AntDesign name="arrowleft" size={32} color={color.title} />
                    </Pressable>

                    <Title style={{ fontSize: 52, marginTop: -10, textAlign: 'center' }}>Curtidos</Title>

                    <Row style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20, }}>
                        <Pressable style={{ paddingVertical: 8, paddingHorizontal: 20, backgroundColor: type === 'pins' ? color.primary : "transparent", borderRadius: 100, borderWidth: 1, borderColor: color.primary, }} onPress={() => { settype('pins') }} >
                            <Label style={{ color: type === 'pins' ? "#fff" : color.primary, fontSize: 20, }}>Pins</Label>
                        </Pressable>
                        <Spacer width={10} />
                        <Pressable style={{ paddingVertical: 8, paddingHorizontal: 20, backgroundColor: type === 'shorts' ? color.primary : "transparent", borderRadius: 100, borderWidth: 1, borderColor: color.primary, }} onPress={() => { settype('shorts') }} >
                            <Label style={{ color: type === 'shorts' ? "#fff" : color.primary, fontSize: 20, }}>Shorts</Label>
                        </Pressable>
                    </Row>

                    {type === 'pins' ?
                        <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 300, }}>
                            <FlatList
                                data={pins}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (<Pin post={item} />)}
                                ListEmptyComponent={<Load />}
                            />
                        </MotiView>
                        :
                        <MotiView from={{ opacity: 0, translateY: 20, }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 300, }}>
                            <FlatList
                                data={shorts}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (<Shorts item={item} />)}
                                ListEmptyComponent={<Load />}
                            />
                        </MotiView>
                    }


                    



                </Column>
            </Scroll>
        </Main>
    )
}

 