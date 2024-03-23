import React, { useState, useContext, useRef, useEffect } from 'react';
import { Pressable, Dimensions, FlatList, Animated, Image , ActivityIndicator, NativeModules } from 'react-native';
import { Column, Label, Row, Main, Scroll, Title, HeadTitle, Spacer } from '@theme/global';
import { ThemeContext } from "styled-components/native";
import { MotiImage, MotiView, useAnimationState } from 'moti';
import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { getDays } from '@api/days';
import { getShorts } from '@api/shorts';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({  }) {
    const { color, theme, font } = useContext(ThemeContext);
    const banner = theme == 'dark' ? require('@assets/imgs/wide.png') : require('@assets/imgs/wide_light.png')
    const [dark, setdark] = useState(false);
    const [data, setdata] = useState([]);
    const [shorts, setshorts] = useState([]);
    const [user, setuser] = useState();

    const [tabIsOpen, settabIsOpen] = useState(false);
    const toggleAnimation = useAnimationState({ close: { translateX: width + 20, }, open: { translateX: 120, }, });
    const [loading, setloading] = useState(true);
    const saudacao = () => { const hora = new Date().getHours(); if (hora >= 0 && hora < 12) { return 'Bom dia' } else if (hora >= 12 && hora < 18) { return 'Boa tarde' } else { return 'Boa noite' } }
    const toggleOpen = () => { if (tabIsOpen) { toggleAnimation.transitionTo('close'); settabIsOpen(false) } else { toggleAnimation.transitionTo('open'); settabIsOpen(true) } }

    const getUser = async () => { 
        const user = await AsyncStorage.getItem('user')
        setuser(JSON.parse(user))
     }

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
 

    const changeTheme = async () => { 
        const storedTheme = await AsyncStorage.getItem('theme');
        const tm = storedTheme === 'light' ? 'dark' : 'light';
        await AsyncStorage.setItem('theme', tm);
        setdark(tm == 'dark' ? true : false) 
    }

 

    if (loading) { return <Main >
        <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <ActivityIndicator size={142} color="#142B74" />
        </Column>
        </Main> }
    return (
        <Main>

            <MotiView state={toggleAnimation} transition={{ type: 'timing', duration: 300, }} style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 1.1 * height, backgroundColor: theme == dark ? "#303030" : "#FFE2BA", zIndex: 99, }} >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: 240,   marginTop: 50, marginLeft:20,}}>
                    <Pressable onPress={toggleOpen} style={{ marginRight: 8,  width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: "#fff", zIndex: 99, }}>
                        <AntDesign name="close" size={24} color="#000" />
                    </Pressable>
                    <Pressable onPress={changeTheme} > 
                    <Column style={{ width: 70, height: 40, backgroundColor: dark ? color.secundary : "#616161",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                        <Column style={{ width: 26, height: 26, backgroundColor: dark ? "#fff" : "#969696", borderRadius: 100, alignSelf: dark ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                    </Column>
                    </Pressable>
                </Row>
                <SideBar />
            </MotiView>

            <Scroll>
                <MotiView from={{opacity: 0, translateY: -50,}} animate={{ opacity: 1, translateY: 0,}}>
                    <Row style={{ paddingTop: 20, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Image source={{ uri: user?.avatar }} style={{ width: 52, height: 52, borderRadius: 100, marginRight: 10, }} />
                            <HeadTitle style={{ lineHeight: 26, fontSize: 24, zIndex: 99, marginLeft: 6,}}>
                            {saudacao()}, {'\n'}{user?.nome}
                            </HeadTitle>
                        </Row>

                        <Pressable onPress={toggleOpen} style={{ marginRight: 8, borderWidth: 2, backgroundColor: !tabIsOpen ? 'transparent' : '#fff', borderColor: color.title, width: 52, height: 52, borderRadius: 12, zIndex: 99, justifyContent: 'center', alignItems: 'center', }}>
                            {!tabIsOpen ? <Column><Column style={{ width: 30, height: 2, borderRadius: 12, backgroundColor: color.title, }} />
                                <Column style={{ width: 20, height: 2, borderRadius: 12, backgroundColor: color.title, marginTop: 6, }} />
                                <Column style={{ width: 25, height: 2, borderRadius: 12, backgroundColor: color.title, marginTop: 6, }} /></Column> : <AntDesign name="close" size={28} color="#000" />}
                        </Pressable>
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
                </Column>
                </MotiView>

            </Scroll>
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

    const scrollX = useRef(new Animated.Value(0)).current;
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
                    <Pressable onPress={() => { router.navigate('reels_scroll') }} style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 12, backgroundColor: "#f7f7f730", borderRadius: 100, }}>
                        <Label>Ver mais</Label>
                    </Pressable>
                </Pressable>}
                snapToOffsets={[440, 880, 1100,]}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, }
                )}
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
                <Column style={{ width: 72, height: 72, backgroundColor: "#ffffff30", borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <MotiImage source={require('@assets/imgs/prayer.png')} style={{ width: 62, height: 62, }} resizeMode='contain' />
                </Column>
                <Title style={{ textAlign: 'center', fontSize: 28, color: '#fff', }}>Quero fazer um pedido {"\n"}de oração</Title>
                <Pressable onPress={() => { router.navigate('/prey') }} style={{ paddingHorizontal: 32, paddingVertical: 8, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 12, }}>
                    <Title style={{ color: color.primary, }}>Fazer oração</Title>
                </Pressable>
            </Column>
        </Row>
    )
}

const SideBar = () => {
    const [dark, setdark] = useState();
    return (
        <Column style={{ padding: 20, marginTop: 40, }}>
          

            <Column style={{ width: 244, alignSelf: 'flex-start', height: 200, backgroundColor: "#252525", borderRadius: 24, }} />
            <Spacer height={20} />
            <Column style={{ width: 244, alignSelf: 'flex-start', height: 100, backgroundColor: "#323232", borderRadius: 24, }} />
            <Spacer height={10} />
            <Column style={{ width: 244, alignSelf: 'flex-start', height: 60, backgroundColor: "#121212", borderRadius: 24, }} />
            <Spacer height={32} />
            <Column style={{ width: 244, alignSelf: 'flex-start', height: 70, backgroundColor: "#505050", borderRadius: 24, }} />
            <Spacer height={8} />
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
