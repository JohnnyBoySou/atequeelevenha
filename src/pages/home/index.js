import React, { useState, useContext, useRef , useEffect} from 'react';
import { Pressable, Dimensions, FlatList, Animated, Image } from 'react-native';
import { Column, Label, Row, Main, Scroll, Title, HeadTitle, Spacer } from '../../theme/global';
import { ThemeContext } from "styled-components/native";
import { MotiImage, MotiView, useAnimationState } from 'moti';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { ExpandingDot } from "react-native-animated-pagination-dots";
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { getDays } from '../../api/days';
import { getShorts } from './../../api/shorts';


export default function HomePage({ navigation }) {

    function formatarData(data) { const meses = ['Jan', 'Fev', 'Março', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']; const dia = data.getDate(); const mes = meses[data.getMonth()]; const ano = data.getFullYear(); return `${dia} de ${mes}`; }
    const day = formatarData(new Date())

    const [data, setdata] = useState([]);
    const [shorts, setshorts] = useState([]);

    const [tabIsOpen, settabIsOpen] = useState(false);
    const toggleAnimation = useAnimationState({ close: {  translateX: width,  }, open: {  translateX: 120, }, });
    const [loading, setloading] = useState(true);

    const handleOpenTab = () => {  toggleAnimation.transitionTo('open'); settabIsOpen(true) }
    const handleCloseTab = () => { toggleAnimation.transitionTo('close'); settabIsOpen(false) }

    useEffect(() => {
        setloading(true)
        const fetchData = () => { 
            getDays().then((res) => { setdata(res);  setloading(false)} )
            getShorts().then((res) => { setshorts(res); } )
        }
        
         fetchData()
        handleCloseTab()
    }, [])
    if(loading){  return <Main><Label>Carregando...</Label></Main>  }
    return (
        <Main>

            <MotiView state={toggleAnimation} transition={{ type: 'timing', duration: 300,}} style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 1.1 * height, backgroundColor: "#101010", zIndex: 99, }} >
                <Pressable onPress={handleCloseTab} style={{ marginRight: 8, alignSelf: 'flex-start', top: 40, left: 20, width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: "#fff", zIndex: 99, }}>
                    <AntDesign name="close" size={24} color="#000" />
                </Pressable>
                <SideBar/>
            </MotiView>

            <Scroll >
                <Row style={{ paddingTop: 30, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                    <MotiImage source={require('../../assets/imgs/logo.png')} style={{ width: 100, height: 100, }} resizeMode='contain' />

                    <Pressable onPress={handleOpenTab} style={{ marginRight: 8, borderWidth: 2, borderColor: "#fff", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, zIndex: 99, }}>
                        <SimpleLineIcons name="menu" size={24} color="#fff" />
                    </Pressable>
                </Row>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <MotiImage source={require('../../assets/imgs/smash.png')} style={{ width: 240, height: 240, marginLeft: 20, opacity: 0.3, marginRight: -70, }} resizeMode='contain' />
                    <MotiImage source={require('../../assets/imgs/gradient.png')} style={{ width: 530, height: 400, marginTop: -270, }} resizeMode='cover' />
                </Row>

                <Column style={{ paddingHorizontal: 20, }}>
                    <Title style={{ fontSize: 52, fontFamily: 'Font_Book', }}>Até que Ele venha</Title>
                    <Label style={{ fontSize: 22, lineHeight: 24, marginTop: 10, }}>Vamos te mostrar um novo jeito de ver e sentir a palavra de Deus.</Label>
                </Column>

                <Column style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                    <HeadTitle>Palavra do dia</HeadTitle>
                    <Spacer height={12} />
                    <WordOfDay item={data[0]} />
                    <Spacer height={24} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <HeadTitle>Vídeos curtos</HeadTitle>
                    </Row>
                    {shorts.length > 0 && <Shorts shorts={shorts}/>}
                    <Spacer height={24} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <HeadTitle>Calendário</HeadTitle>
                    </Row>
                    <Calendar/> 
                    <Spacer height={24} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <HeadTitle>Pedido de oração</HeadTitle>
                    </Row>
                    <Prayer/>

                    <Spacer height={244} />
                </Column>


            </Scroll>
        </Main>
    )
}


const WordOfDay = ({ item }) => {
    const navigation = useNavigation();
    const { color, font } = useContext(ThemeContext);
    return (
        <Pressable onPress={() => {navigation.navigate('Post',{item: item,})}}  style={{ backgroundColor: color.primary, flexGrow: 1, padding: 12, borderRadius: 16, }}>
            <Pressable style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#f7f7f730", alignSelf: 'flex-end', borderRadius: 100, }}>
                <Label>{item?.time}</Label>
            </Pressable>
            <Title style={{ textAlign: 'center', fontSize: 46, fontFamily: font.book, marginTop: 12, marginBottom: 26, }}>{item?.day} de {item.month}</Title>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Label style={{ color: "#fff", fontSize: 20, }}>Pastor: {item.pastor}</Label>
                <Label style={{ color: "#fff", fontSize: 24, }}>{item.versiculoCaption}</Label>
            </Row>
        </Pressable>
    )
}

const Shorts = ({ shorts }) => {
    const { color, font } = useContext(ThemeContext);
    const navigation = useNavigation();

    const Video = ({ item, index }) => {
        return (
            <Pressable onPress={() => navigation.navigate('ShortDetails', { item: item, })} style={{ width: 190, height: 272, backgroundColor: "#DF8E3C", marginLeft: 20,  borderRadius: 16, }}>
                <Image source={{uri: item?.url}} style={{ width: 190, height: 272, borderRadius: 16, }} resizeMode='cover' />
            </Pressable>
        )
    }
   
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Column style={{ marginTop: 16, }}>
            <FlatList
                data={shorts}
                renderItem={({ item, index }) => <Video item={item} index={index} />}
                keyExtractor={item => item.id}
                style={{ marginHorizontal: -20, }}
                horizontal
                decelerationRate={0.8}
                ListFooterComponent={<Column style={{  width: 200, height: 272, backgroundColor: color.primary, marginHorizontal: 20, borderRadius: 16,}}><AntDesign name="plus" size={24} color="#fff" /></Column>}
                snapToOffsets={[440, 880, 1100,]}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{nativeEvent:{contentOffset: { x: scrollX } } }], {useNativeDriver: false, }
                  )}
            />
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                <Pressable style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center', }}>
                    <Label style={{ color: "#000", fontSize: 18, }}>Ver mais</Label>
                </Pressable>
            
                    <ExpandingDot
                        data={shorts.slice(0, 4)}
                        expandingDotWidth={30}
                        scrollX={scrollX}
                        inActiveDotOpacity={0.8}
                        activeDotColor={color.secundary}
                        inActiveDotColor='#909090'
                        dotStyle={{
                            width: 12,
                            height: 12,
                            borderRadius: 100,
                            marginHorizontal: 6,
                        }}
                        containerStyle={{
                            backgroundColor: "#404040",
                            padding: 12,
                            right: 0,
                            bottom: 6,
                            borderRadius: 100,
                        }}
                    />

            </Row>
        </Column>
    )
}

const Calendar = () => { 
    const [days, setDays] = useState([
        { id: 1, day: 1, month: 'Junho', complete: true, lock: false,},
        { id: 2, day: 2, month: 'Junho', complete: false, lock: true,},
        { id: 3, day: 3, month: 'Junho', complete: false, lock: true,},
        { id: 4, day: 4, month: 'Junho', complete: false, lock: true,},
    ]);
    const navigation = useNavigation();
    const Card = ({item}) => { 
        return(
            <Pressable onPress={() => {navigation.navigate('Calendar')}} >
                <Column style={{ width: 80, height: 200, marginLeft: 12, justifyContent: 'flex-end', alignItems: 'center',  borderRadius: 100, 
                    backgroundColor: item?.complete ? "#E26D5E" : "#303030",}}>
                    <Title style={{  transform: [{rotate: '90deg',}], width: 200,  }}>{item?.day}  de  {item?.month}</Title>
                    <AntDesign name={item.lock ? 'lock' : 'check'} size={24} color={item.lock ? '#ffffff50' : 'transparent'} style={{ marginTop: 0, marginBottom: 20, }}/>
                </Column>
            </Pressable>
        )
    }
    return(
        <Row>
            <FlatList
                data={days}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={item => item.id}
                horizontal
                style={{ marginTop: 12, marginHorizontal: -20, paddingLeft: 12,}}
                showsHorizontalScrollIndicator={false}
            />
           
        </Row>
    )
}

const Prayer = () => { 
    const navigation = useNavigation();
    return(
        <Row style={{ position: 'relative', marginVertical: 30, justifyContent: 'center', }}>
            <Column style={{ width: 300, height: 240, backgroundColor: "#404040", position: 'absolute', borderRadius: 32, transform: [{rotate: '-12deg'}] }}/> 
            <Column  style={{ width: 300, height: 240, backgroundColor: "#E26D5E", position: 'absolute', borderRadius: 32, transform: [{rotate: '5deg'}], justifyContent: 'center', alignItems: 'center',  }}>
                <Column  style={{ width: 72, height: 72, backgroundColor: "#ffffff30", borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <MotiImage source={require('../../assets/imgs/prayer.png')} style={{ width: 62, height: 62, }} resizeMode='contain' />
                </Column>
                <Title style={{ textAlign: 'center', fontSize: 28, }}>Quero fazer um pedido {"\n"}de oração</Title>
                <Pressable onPress={() => {navigation.navigate('Prey')}}  style={{ paddingHorizontal: 32, paddingVertical: 8, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center',  alignSelf:'center' , marginTop: 12,}}>
                    <Title style={{ color: "#E26D5E", }}>Fazer oração</Title>
                </Pressable>
            </Column>
        </Row>
    )
}

const SideBar = () => { 
    return(
        <Column style={{ padding: 20, marginTop: 40, }}>
            <Column  style={{ width: 244, alignSelf: 'flex-start', height: 200, backgroundColor: "#252525", borderRadius: 24, }}/>
            <Spacer height={20}/>
            <Column  style={{ width: 244, alignSelf: 'flex-start', height: 100, backgroundColor: "#323232", borderRadius: 24, }}/>
            <Spacer height={10}/>
            <Column  style={{ width: 244, alignSelf: 'flex-start', height: 60, backgroundColor: "#121212", borderRadius: 24, }}/>
            <Spacer height={32}/>
            <Column  style={{ width: 244, alignSelf: 'flex-start', height: 70, backgroundColor: "#505050", borderRadius: 24, }}/>
            <Spacer height={8}/>
        </Column>
    )
}