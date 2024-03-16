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
    const { color, theme, font } = useContext(ThemeContext);
    function formatarData(data) { const meses = ['Jan', 'Fev', 'Março', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']; const dia = data.getDate(); const mes = meses[data.getMonth()]; const ano = data.getFullYear(); return `${dia} de ${mes}`; }
    const day = formatarData(new Date())
    const banner = theme == 'dark' ? require('../../assets/imgs/wide.png') : require('../../assets/imgs/wide_light.png')
    const [data, setdata] = useState([]);
    const [shorts, setshorts] = useState([]);

    const [tabIsOpen, settabIsOpen] = useState(false);
    const toggleAnimation = useAnimationState({ close: {  translateX: width,  }, open: {  translateX: 120, }, });
    const [loading, setloading] = useState(true);

    const toggleOpen = () => {   if(tabIsOpen){ toggleAnimation.transitionTo('close'); settabIsOpen(false) }else{ toggleAnimation.transitionTo('open'); settabIsOpen(true) }}

    useEffect(() => {
        setloading(true)
        const fetchData = () => { 
            getDays().then((res) => { setdata(res);  setloading(false)} )
            getShorts().then((res) => { setshorts(res); } )
        }
         fetchData()
         toggleAnimation.transitionTo('close'); settabIsOpen(false)
    }, [])
    if(loading){  return <Main><Label>Carregando...</Label></Main>  }
    return (
        <Main>

            <MotiView state={toggleAnimation} transition={{ type: 'timing', duration: 300,}} style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 1.1 * height, backgroundColor: color.background, zIndex: 99, }} >
                <Pressable onPress={toggleOpen} style={{ marginRight: 8, alignSelf: 'flex-start', top: 40, left: 20, width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: "#fff", zIndex: 99, }}>
                    <AntDesign name="close" size={24} color="#000" />
                </Pressable>
                <SideBar/>
            </MotiView>

            <Scroll>
                <Row style={{ paddingTop: 40, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Pressable onPress={toggleOpen} style={{ marginRight: 8, borderWidth: 2, backgroundColor: !tabIsOpen ? 'transparent' : '#fff',  borderColor:  color.title, width: 52, height: 52, borderRadius: 12, zIndex: 99, justifyContent: 'center', alignItems: 'center', }}>
                       {!tabIsOpen ? <Column><Column style={{ width: 30, height: 2, borderRadius:12, backgroundColor:  color.title,}}/>
                        <Column style={{ width: 20, height: 2, borderRadius:12, backgroundColor: color.title, marginTop: 6,}}/>
                        <Column style={{ width: 25, height: 2, borderRadius:12, backgroundColor:  color.title, marginTop: 6,}}/></Column> : <AntDesign name="close" size={28} color="#000" /> }
                    </Pressable>
                </Row>

                <Column>
                    <MotiImage source={banner} style={{ width: '100%', height: 300, marginTop: -20, }} resizeMode='contain' />
                    <Label style={{ fontSize: 22, lineHeight: 24, marginTop: -30, textAlign: 'center', width:300, alignSelf: 'center'}}>Vamos te mostrar um novo jeito de ver e sentir a palavra de Deus.</Label>
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
                <Label style={{ color: "#fff", }}>{item?.time}</Label>
            </Pressable>
            <Title style={{  color: "#fff", textAlign: 'center', fontSize: 46, fontFamily: font.book, marginTop: 12, marginBottom: 26, }}>{item?.day} de {item.month}</Title>
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
                data={shorts.slice(0,5)}
                renderItem={({ item, index }) => <Video item={item} index={index} />}
                keyExtractor={item => item.id}
                style={{ marginHorizontal: -20, }}
                horizontal
                decelerationRate={0.8}
                ListFooterComponent={<Pressable onPress={() => {navigation.navigate('Reels')}} style={{  width: 200, height: 272, justifyContent: 'center', alignItems: 'center',  backgroundColor: color.primary, marginHorizontal: 20, borderRadius: 16,}}>
                <AntDesign name="pluscircle" size={64} color="#fff" />
                <Pressable onPress={() => {navigation.navigate('Reels')}}  style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 12, backgroundColor: "#f7f7f730",  borderRadius: 100, }}>
                        <Label>Ver mais</Label>
                    </Pressable>
                </Pressable>}
                snapToOffsets={[440, 880, 1100,]}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{nativeEvent:{contentOffset: { x: scrollX } } }], {useNativeDriver: false, }
                  )}
            />
                    <Column style={{ marginTop: 60, marginBottom: -20, }}>
                    <ExpandingDot
                        data={shorts.slice(0, 3)}
                        expandingDotWidth={30}
                        scrollX={scrollX}
                        inActiveDotOpacity={0.8}
                        activeDotColor={color.primary}
                        inActiveDotColor={color.secundary}
                        dotStyle={{
                            width: 12,
                            height: 12,
                            borderRadius: 100,
                            marginHorizontal: 6,
                        }}
                        containerStyle={{
                            backgroundColor: color.secundary+40,
                            padding: 12,
                            right: 0,
                            bottom: 6,
                            borderRadius: 100,
                        }}
                    />
                    </Column>

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
    const { color } = useContext(ThemeContext)
    const Card = ({item}) => { 
        return(
            <Pressable onPress={() => {navigation.navigate('Calendar')}} >
                <Column style={{ width: 80, height: 200, marginLeft: 12, justifyContent: 'flex-end', alignItems: 'center',  borderRadius: 100, 
                    backgroundColor: item?.complete ? color.primary : color.primary, opacity: item?.complete ? 1 : 0.6,}}>
                    <Title style={{  transform: [{rotate: '90deg',}], width: 200, color: item?.complete ? "#fff" : "#fff" }}>{item?.day}  de  {item?.month}</Title>
                    <AntDesign name={item.lock ? 'lock' : 'check'} size={24} color={item.lock ? color.secundary : '#fff'} style={{ marginTop: 0, marginBottom: 20, }}/>
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
    const { color } = useContext(ThemeContext)
    const navigation = useNavigation();
    return(
        <Row style={{ position: 'relative', marginVertical: 30, justifyContent: 'center', }}>
            <Column style={{ width: 300, height: 240, backgroundColor: color.primary+50, position: 'absolute', borderRadius: 32, transform: [{rotate: '-12deg'}] }}/> 
            <Column  style={{ width: 300, height: 240, backgroundColor: color.primary, position: 'absolute', borderRadius: 32, transform: [{rotate: '5deg'}], justifyContent: 'center', alignItems: 'center',  }}>
                <Column  style={{ width: 72, height: 72, backgroundColor: "#ffffff30", borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <MotiImage source={require('../../assets/imgs/prayer.png')} style={{ width: 62, height: 62, }} resizeMode='contain' />
                </Column>
                <Title style={{ textAlign: 'center', fontSize: 28, color: '#fff', }}>Quero fazer um pedido {"\n"}de oração</Title>
                <Pressable onPress={() => {navigation.navigate('Prey')}}  style={{ paddingHorizontal: 32, paddingVertical: 8, borderRadius: 100, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center',  alignSelf:'center' , marginTop: 12,}}>
                    <Title style={{ color: color.primary, }}>Fazer oração</Title>
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