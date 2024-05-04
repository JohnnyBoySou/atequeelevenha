import React, { useState, useContext, useRef, useEffect } from 'react';
import { Image, Pressable, Dimensions, FlatList,  ActivityIndicator,  } from 'react-native';
import { Column, Label, Row, Main, Scroll, Title, HeadTitle, Spacer } from '@theme/global';
import { ThemeContext } from "styled-components/native";
import { AnimatePresence, MotiImage, MotiView, useAnimationState } from 'moti';
import { AntDesign, Feather, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDays } from '@api/days';
import { getShorts } from '@api/shorts';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('window');

const logo = require('@assets/imgs/logo_blue_bg.png')

export default function HomePage({  }) {
    const { color, theme, font } = useContext(ThemeContext);
    const [data, setdata] = useState([]);
    const [shorts, setshorts] = useState([]);
    const [user, setuser] = useState();
    const [tabIsOpen, settabIsOpen] = useState(false);
    const [loading, setloading] = useState(true);
    
    const banner = theme == 'dark' ? require('@assets/imgs/wide.png') : require('@assets/imgs/wide_light.png')
    const toggleAnimation = useAnimationState({ close: { translateX: width + 20, }, open: { translateX: 120, }, });
    const accountref = useRef()
  
    const saudacao = () => { const hora = new Date().getHours(); if (hora >= 0 && hora < 12) { return 'Bom dia' } else if (hora >= 12 && hora < 18) { return 'Boa tarde' } else { return 'Boa noite' } }
    const toggleOpen = () => { if (tabIsOpen) { toggleAnimation.transitionTo('close'); settabIsOpen(false) } else { toggleAnimation.transitionTo('open'); settabIsOpen(true) } }
    const getUser = async () => {  const user = await AsyncStorage.getItem('user'); setuser(JSON.parse(user));}

    useEffect(() => {
        setloading(true)
        const fetchData = async () => {
            getDays().then((res) => { setdata(res); setloading(false) })
            getShorts().then((res) => { setshorts(res); })
        }
        fetchData()
        getUser()
        toggleAnimation.transitionTo('close'); settabIsOpen(false)
    }, [])
 

    if (loading) { return <Main >
        <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <ActivityIndicator size={142} color="#142B74" />
        </Column>
        </Main> }

    return (
        <Main>
            <Scroll>
                <MotiView from={{opacity: 0, translateY: -50,}} animate={{ opacity: 1, translateY: 0,}}>
                    <Row style={{ paddingTop: 20, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Pressable onPress={() => { accountref.current.expand()}} style={{ justifyContent: 'center', alignItems: 'center',  flexDirection: 'row'}}>
                            <Image source={{ uri: user?.avatar }} style={{ width: 52, height: 52, borderRadius: 100, marginRight: 10, }} />
                            <HeadTitle style={{ lineHeight: 26, fontSize: 24, zIndex: 99, marginLeft: 6, fontFamily: font.medium,}}>
                            {saudacao()}, {'\n'}{user?.nome}
                            </HeadTitle>
                        </Pressable>
                        <Row>
                        <Pressable onPress={() => { router.navigate('notifications')}} style={{   width: 52, height: 52, borderRadius: 12, zIndex: 99, justifyContent: 'center', alignItems: 'center', }}>
                            <Fontisto name="bell" size={24} color={color.title} />
                        </Pressable>
                        <Pressable onPress={toggleOpen} style={{ marginRight: 8,     width: 52, height: 52, borderRadius: 12, zIndex: 99, justifyContent: 'center', alignItems: 'center', }}>
                            {!tabIsOpen ? <Column style={{ justifyContent: 'center', alignItems: 'flex-end',  }}>
                                <Column style={{ width: 30, height: 3, borderRadius: 12, backgroundColor: color.title, }} />
                                <Column style={{ width: 20, height: 3, borderRadius: 12, backgroundColor: color.title, marginTop: 6,}} />
                                <Column style={{ width: 25, height: 3, borderRadius: 12, backgroundColor: color.title, marginTop: 6, }} /></Column> : <AntDesign name="close" size={28} color="#000" />}
                        </Pressable>
                        </Row>
                    </Row>
                </MotiView>

                <MotiView from={{opacity: 0, translateY: 50,}} animate={{ opacity: 1, translateY: 0,}} transition={{delay: 300,}}>
                    <Column>
                        <MotiImage source={banner} style={{ width: '100%', height: 310, marginTop: -20,}} resizeMode='contain' />
                        <Label style={{ fontSize: 22, lineHeight: 24, marginTop: -30, textAlign: 'center', width: 300, alignSelf: 'center' }}>Vamos te mostrar um novo jeito de ver e sentir a palavra de Deus.</Label>
                    </Column>
                </MotiView>

                <MotiView from={{opacity: 0, translateY: 50,}} animate={{ opacity: 1, translateY: 0,}} transition={{delay: 700,}}>
                    <Column style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                        <HeadTitle>Palavra do dia</HeadTitle>
                        <Spacer height={12} />
                        <WordOfDay item={data[0]} />
                        <Spacer height={24} />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <HeadTitle>Vídeos curtos</HeadTitle>
                        </Row>
                        {shorts.length > 0 && <Shorts shorts={shorts} />}
                        <Spacer height={24} />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <HeadTitle>Calendário</HeadTitle>
                        </Row>
                        <Calendar />
                        <Spacer height={24} />
                        <HeadTitle>Pins cristões</HeadTitle>
                        <Pins />
                        <Spacer height={24} />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <HeadTitle>Pedido de oração</HeadTitle>
                        </Row>
                        <Prayer />
                        <Spacer height={244} />
                        <HeadTitle>Eventos</HeadTitle>
                        <Event color={color}/>

                        <Spacer height={24} />
                        <HeadTitle>Audios</HeadTitle>
                        <Audio color={color}/>
                    </Column>
                </MotiView>

            </Scroll>
            <BottomSheet snapPoints={[0.5, 500, 700]} ref={accountref}  backgroundStyle={{  backgroundColor: "#FBF7F2" }} handleIndicatorStyle={{backgroundColor: "#30303060",}}>
                <BottomSheetScrollView>
                    <Image source={require('@assets/imgs/account_wallpaper.png')} style={{ width: '100%', height: 600, borderRadius: 12, position: 'absolute', top: 0,}} resizeMode='cover' />
                    <Pressable onPress={() => {accountref.current.close()}} style={{ marginTop: 10, }}>
                        <AntDesign name='close' size={32} color="#000" style={{ alignSelf: 'flex-end', marginRight: 20, }} />
                    </Pressable>
                    <Account user={user}/>
                </BottomSheetScrollView>
            </BottomSheet>

            
<MotiView state={toggleAnimation} transition={{ type: 'timing', duration: 300, }} style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 1.1 * height,  zIndex: 999, backgroundColor: "#3E59AE",  borderRadius: 12,}} >
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: 230, marginTop: 34, marginLeft: 20, zIndex: 99,}}>
                        <Pressable onPress={toggleOpen} style={{ marginRight: 8,  width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100,  }}>
                            <AntDesign name="close" size={32} color="#fff" />
                        </Pressable>
                        <Feather name="help-circle" size={32} color="#fff" />
                    </Row>
                    <AnimatePresence>
                    {tabIsOpen && <MotiImage from={{scale: 0.6, transform: [{rotate: '12deg',}]}} animate={{ scale: 1.1, transform: [{rotate: '0deg',}]}}  exit={{scale: 0.6}} source={logo} style={{ width: 80, height: 100, marginLeft: 100,}} resizeMode='contain' />}
                    </AnimatePresence>
                    <SideBar color={color} font={font}/>
                </MotiView>


        </Main>
    )
}

const WordOfDay = ({ item }) => {
    const { color, font } = useContext(ThemeContext);

    const handle = () => {
        router.push({
            pathname: '/(stack)/post/[item]',
            params: {
                it: JSON.stringify(item),
            },
        })
    }
    return (
        <>
        <Pressable onPress={handle}
            style={{ backgroundColor: color.primary, flexGrow: 1, padding: 12, borderRadius: 16, }}>
            <Pressable style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#f7f7f730", alignSelf: 'flex-end', borderRadius: 100, }}>
                <Label style={{ color: "#fff", }}>{item?.time}</Label>
            </Pressable>
            <Title style={{ color: "#fff", textAlign: 'center', fontSize: 46, fontFamily: font.book, marginTop: 12, marginBottom: 26, }}>{item?.day} de {item.month}</Title>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Label style={{ color: "#fff", fontSize: 20, }}>Pastor: {item.pastor}</Label>
                <Label style={{ color: "#fff", fontSize: 24, }}>{item.versiculoCaption}</Label>
            </Row>
        </Pressable>
        <Column style={{ backgroundColor: color.primary+80, marginHorizontal: 20, height: 16, flexGrow: 1, borderBottomRightRadius: 12, borderBottomLeftRadius: 12,}}/>
        </>
    )
}

const Shorts = ({ shorts }) => {
    const { color, font } = useContext(ThemeContext);
    const Video = ({ item, }) => {
        const handle = () => {
            router.push({
                pathname: '/(stack)/shorts/[item]',
                params: {
                    it: JSON.stringify(item),
                },
            })
        }
        return (
            <Pressable onPress={handle} style={{ width: 190, height: 272, backgroundColor: "#DF8E3C", marginLeft: 20, borderRadius: 16, }}>
                <Image source={{ uri: item?.url }} style={{ width: 190, height: 272, borderRadius: 16, }} resizeMode='cover' />
            </Pressable>
        )
    }

    return (
        <Column style={{ marginTop: 16, }}>
            <FlatList
                data={shorts.slice(0, 5)}
                renderItem={({ item, index }) => <Video item={item} index={index} />}
                keyExtractor={item => item.id}
                style={{ marginHorizontal: -20, }}
                horizontal
                decelerationRate={0.8}
                ListFooterComponent={<Pressable onPress={() => { router.navigate('reels_scroll') }} style={{ width: 200, height: 272, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary, marginHorizontal: 20, borderRadius: 16, }}>
                    <AntDesign name="pluscircle" size={64} color="#fff" />
                    <Column onPress={() => { router.navigate('reels_scroll') }} style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 12, backgroundColor: "#f7f7f730", borderRadius: 100, }}>
                        <Label>Ver mais</Label>
                    </Column>
                </Pressable>}
                snapToOffsets={[440, 880, 1100,]}
                showsHorizontalScrollIndicator={false} 
            />
            

        </Column>
    )
}

const Calendar = () => {
    const [days, setDays] = useState([
        { id: 1, day: 1, month: 'Junho', complete: true, lock: false, },
        { id: 2, day: 2, month: 'Junho', complete: false, lock: true, },
        { id: 3, day: 3, month: 'Junho', complete: false, lock: true, },
        { id: 4, day: 4, month: 'Junho', complete: false, lock: true, },
    ]);
    const navigation = useNavigation();
    const { color } = useContext(ThemeContext)
    const Card = ({ item }) => {
        return (
            <Pressable onPress={() => { router.navigate('/calendar') }} >
                <Column style={{
                    width: 80, height: 200, marginLeft: 12, justifyContent: 'flex-end', alignItems: 'center', borderRadius: 100,
                    backgroundColor: item?.complete ? color.primary : color.primary, opacity: item?.complete ? 1 : 0.6,
                }}>
                    <Title style={{ transform: [{ rotate: '90deg', }], width: 200, color: item?.complete ? "#fff" : "#fff" }}>{item?.day}  de  {item?.month}</Title>
                    <AntDesign name={item.lock ? 'lock' : 'check'} size={24} color={item.lock ? color.secundary : '#fff'} style={{ marginTop: 0, marginBottom: 20, }} />
                </Column>
            </Pressable>
        )

    }
    return (
        <Row>
            <FlatList
                data={days}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={item => item.id}
                horizontal
                style={{ marginTop: 12, marginHorizontal: -20, paddingLeft: 12, }}
                showsHorizontalScrollIndicator={false}
            />

        </Row>
    )
}

const Prayer = () => {
    const { color } = useContext(ThemeContext)
    return (
        <Row style={{ position: 'relative', marginVertical: 30, justifyContent: 'center', }}>
            <Column style={{ width: 300, height: 240, backgroundColor: color.primary + 50, position: 'absolute', borderRadius: 32, transform: [{ rotate: '-12deg' }] }} />
            <Column style={{ width: 300, height: 240, backgroundColor: color.primary, position: 'absolute', borderRadius: 32, transform: [{ rotate: '5deg' }], justifyContent: 'center', alignItems: 'center', }}>
                <Animated.View sharedTransitionTag="prey" style={{ width: 72, height: 72, backgroundColor: "#ffffff30", borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <Image  source={require('@assets/imgs/prayer.png')} style={{ width: 62, height: 62, }} resizeMode='contain' />
                </Animated.View>
                <Title style={{ textAlign: 'center', fontSize: 28, color: '#fff', }}>Quero fazer um pedido {"\n"}de oração</Title>
                <Pressable onPress={() => { router.navigate('/prey') }} style={{ paddingHorizontal: 32, paddingVertical: 8, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 12, }}>
                    <Title style={{ color: color.primary, }}>Fazer oração</Title>
                </Pressable>
            </Column>
        </Row>
    )
}


const SideBar = ({color, font}) => {
    return (
        <Column style={{ padding: 20, marginTop: 10, zIndex: 99,  borderRadius: 16, width: 280, backgroundColor: "#FFE8D7", height: '100%', flex: 1,}}>
            
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: color.primary, borderRadius: 8, marginBottom: 12,  }}>
                <Feather name="home" size={24} color="#fff" />
                <Title style={{ fontSize: 24, marginLeft: 10, fontFamily: font.medium, color: "#fff", }}>Início</Title>
            </Pressable>

            <Pressable onPress={() => { router.navigate('pins/home') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="grid" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Pins</Title>
            </Pressable>

            <Pressable onPress={() => { router.navigate('audio/page') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="disc" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Áudio</Title>
            </Pressable>

            <Pressable onPress={() => { router.navigate('reels_scroll') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="play" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Shorts</Title>
            </Pressable>
            <Pressable onPress={() => { router.navigate('editor') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="layers" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Editor</Title>
            </Pressable>
            <Pressable onPress={() => { router.navigate('spotify') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="music" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Playlist's</Title>
            </Pressable>
            <Pressable onPress={() => { router.navigate('shop') }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="shopping-bag" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Loja</Title>
            </Pressable>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#ffffff70", borderRadius: 6, marginBottom: 12,  }}>
                <Feather name="star" size={24} color={color.title} />
                <Title style={{ fontSize: 20, marginLeft: 10, fontFamily: font.book, }}>Avaliar App</Title>
            </Pressable>

        </Column>
    )
}



const Pins = () => {
    return (
        <Pressable onPress={() => {router.navigate('pins/home')}} style={{ justifyContent: 'center', alignItems: 'center',  alignSelf: 'center' }}>
            <Row style={{ marginTop: 10, }}>
                <Image source={{uri: 'https://i.pinimg.com/564x/e8/e6/40/e8e64037177233eb55079c088c543a7d.jpg'}} style={{  width: '47%', alignSelf: 'flex-start', height: 270, backgroundColor: "#252525", borderRadius: 24, }} />
                <Spacer height={6} width={10} />
                <Column style={{  width: '46%', }}>
                    <Image source={{uri: 'https://i.pinimg.com/564x/aa/de/d3/aaded35eba71464e4ab518377567da05.jpg'}} style={{ width: '100%', alignSelf: 'flex-start', height: 100, backgroundColor: "#323232", borderRadius: 24, }} />
                    <Spacer height={10} />
                    <Image  source={{uri: 'https://i.pinimg.com/564x/83/94/04/8394044f0c430ea3c83433857f3f6379.jpg'}} style={{  width: '100%', alignSelf: 'flex-start', height: 160, backgroundColor: "#121212", borderRadius: 24, }} />
                </Column>
            </Row>
        </Pressable>

    )
}


const Account = ({ user }) => { 
    const { color} = useContext(ThemeContext)
    return(
        <Column>
            <Column style={{ justifyContent: 'center', }}>
                <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <Image source={{ uri: user?.avatar }} style={{ width: 145, height: 145, borderRadius: 100,  borderWidth: 4, borderColor: "#fff",}} />
                    <Title style={{ lineHeight: 26, fontSize: 28, zIndex: 99, marginTop: 14, letterSpacing: -1,}}>{user?.nome}</Title>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 6,  }}>
                        <Label>{user?.email}</Label>
                    </Row>
                    <Row>
                        <Pressable onPress={() => {router.navigate('/likes')}} style={{ paddingVertical: 8, paddingHorizontal: 20, borderRadius: 100,  marginTop: 6, borderWidth: 1, borderColor: color.primary,}}>
                            <Label style={{ color: color.primary,  }}>Pins & Shorts curtidos</Label>
                        </Pressable>
                    </Row>
                </Column>
                <Column style={{ flexGrow: 1, flex: 1, marginVertical: 24, height: 1, backgroundColor: "#30303020", marginHorizontal: 20,  }}/>
                   

                    <Column style={{ marginHorizontal: 0, }}>
                        <Title style={{ letterSpacing: -1, marginLeft: 20,}}>Preferências</Title>
                        <Pressable  style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#30303020"  }}>
                              <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <MaterialIcons name="dark-mode" size={24} color={color.label} />
                                <Label style={{letterSpacing: -1, marginLeft: 10,}}>Modo Escuro</Label>
                              </Row>
                                <Column style={{ width: 50, height: 30, backgroundColor: user?.dark ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 20, height: 20, backgroundColor: user?.dark ? "#fff" : "#969696", borderRadius: 100, alignSelf: user?.dark ? 'flex-end' : 'flex-start', marginHorizontal: 6,}}/>
                                </Column>
                        </Pressable>
                        <Pressable  style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#30303020"  }}>
                              <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <Fontisto name="text-height" size={24} color={color.label} />
                                <Label style={{letterSpacing: -1, marginLeft: 10,}}>Fontes Grandes</Label>
                              </Row>
                                <Column style={{ width: 50, height: 30, backgroundColor: user?.fonte_grande ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 20, height: 20, backgroundColor: user?.fonte_grande ? "#fff" : "#969696", borderRadius: 100, alignSelf: user?.fonte_grande ? 'flex-end' : 'flex-start', marginHorizontal: 6,}}/>
                                </Column>
                        </Pressable>
                        <Pressable  style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#30303020"  }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <Ionicons name="game-controller-outline" size={24} color={color.label} /> 
                                <Label style={{letterSpacing: -1, marginLeft: 10,}}>Modo Game</Label>
                              </Row>
                                <Column style={{ width: 50, height: 30, backgroundColor: user?.gaming ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 20, height: 20, backgroundColor: user?.gaming ? "#fff" : "#969696", borderRadius: 100, alignSelf: user?.gaming ? 'flex-end' : 'flex-start', marginHorizontal: 6,}}/>
                                </Column>
                        </Pressable>
                        <Pressable  style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 12,  paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#30303020"  }}>
                              <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                <Fontisto name="text-height" size={24} color={color.label} />
                                <Label style={{letterSpacing: -1, marginLeft: 10,}}>Imagens em HD</Label>
                              </Row>
                                <Column style={{ width: 50, height: 30, backgroundColor: user?.hd_images ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                    <Column style={{ width: 20, height: 20, backgroundColor: user?.hd_images ? "#fff" : "#969696", borderRadius: 100, alignSelf: user?.hd_images ? 'flex-end' : 'flex-start', marginHorizontal: 6,}}/>
                                </Column>
                        </Pressable>
                        <Pressable  style={{ justifyContent: 'space-between', alignItems: 'center', borderRadius: 30,  paddingVertical: 12, paddingHorizontal: 32, backgroundColor: color.primary, marginVertical: 20, alignSelf: 'center',}}>
                            <Title style={{ fontSize: 18, letterSpacing: -1, color: "#fff"}}>Salvar</Title>
                        </Pressable>
                    </Column>
            </Column>
        </Column>
    )
 }


 const Event = ({color}) => { 
    return(
        <Pressable onPress={() => {router.navigate('/event')}} style={{  flexGrow: 1, height: 160, borderRadius: 12, justifyContent: 'center', alignItems: 'center', padding: 12, marginVertical: 12, marginTop: 30, }}>
            <Image source={require('@assets/imgs/event_card.png')} style={{ flexGrow: 1, height: 190,  borderRadius: 24,}} resizeMode='contain'/>
        </Pressable>
    )
  }

  
 const Audio = ({color}) => { 
    return(
        <Pressable onPress={() => {router.navigate('/audio/page')}} style={{  flexGrow: 1, height: 160, borderRadius: 12, justifyContent: 'center', alignItems: 'center', padding: 12, marginVertical: 12, marginTop: 30, }}>
            <Image source={require('@assets/imgs/audio.png')} style={{ flexGrow: 1, height: 190,  borderRadius: 24,}} resizeMode='contain'/>
        </Pressable>
    )
  }