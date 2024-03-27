import React, { useState, useContext, useRef } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { Column, Row, Main, Scroll, Title, Label, Spacer } from '@theme/global';
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import  BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function Event() {
    const { color, font} = useContext(ThemeContext)
    const [month, setmonth] = useState('Junho');
    const [type, settype] = useState('Cultos');
    const cultos = [{
        title: 'Culto de Libertação & Graças',
        date: 'Domingo, 13 de Junho',
        start: '19:00',
        end: '21:00',
        location: [
            'Jaraguá do Sul, Centro - SC',
            'Rua Rudolfo Hufenessler, 743'
        ],
        youtube: '',
        team: [
            {
                name: 'Pr. João da Silva',
                photo: require('@assets/imgs/pastor1.png')
            },
            {
                name: 'Pr. João da Silva',
                photo: require('@assets/imgs/pastor2.png')
            },
            {
                name: 'Pr. João da Silva',
                photo: require('@assets/imgs/pastor3.png')
            }
        ]
    }]
    const [select, setselect] = useState();
    const details = useRef()
    return (
        <Main>
            <Scroll>
                <Column>

                    <ImageBackground source={require('@assets/imgs/home_gradient.png')} style={{ width: '100%',  paddingVertical: 32,}} imageStyle={{borderRadius: 36,}} >
                        <Row style={{ justifyContent: 'space-between', marginBottom: 12, alignItems: 'center', marginHorizontal: 24, marginBottom: 20, }}> 
                            <Title style={{ fontSize: 46, }}>{month}</Title> 
                            <Ionicons name="albums-outline" size={32} color={color.title} />
                        </Row>
                        <Days />
                    </ImageBackground>

                    <Row style={{ marginHorizontal: 24, marginTop: 24, justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Pressable style={{ backgroundColor: type === 'Cultos' ? color.secundary : 'transparent',  borderColor: type === 'Cultos' ? color.secundary : color.title+80, borderWidth: 2, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexGrow: 1, }} onPress={() => {settype('Cultos')}}>
                            <Title style={{ color: type === 'Cultos' ? color.title : color.title+80  }}>Cultos</Title>
                        </Pressable>
                        <Spacer />
                        <Pressable style={{ backgroundColor: type === 'Eventos' ? color.secundary : 'transparent',  borderColor: type === 'Eventos' ? color.secundary : color.title+80, borderWidth: 2, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexGrow: 1, }} onPress={() => {settype('Eventos')}} >
                            <Title style={{ color: type === 'Eventos' ? color.title : color.title+80 }}>Eventos</Title>
                        </Pressable>
                    </Row>

                    <Column style={{ marginTop: 20, }}>
                        {cultos.map((item) => (
                            <Pressable onPress={() => {setselect(item); details.current?.expand(); }}   key={item.title} style={{ padding: 12, borderRadius: 12, backgroundColor: color.primary+20, marginHorizontal: 20, }}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center',   }}>
                                    <Column style={{ width: 8, height: '100%', backgroundColor: color.primary, borderRadius: 100,}}/>
                                    <Column>
                                        <Title style={{ fontSize: 24, marginBottom: 12, letterSpacing: -1, marginHorizontal: 12, width: 200,}}>{item.title}</Title>
                                        <Row style={{ marginLeft: 12, }}>
                                        {item.team.map((tm) => 
                                            <Image source={tm?.photo} style={{ width: 38, height: 38, borderRadius: 100, marginRight: -12, borderWidth: 2, borderColor: color.primary+20}} />
                                        )}
                                        </Row>
                                    </Column>
                                    <Column style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1,  }}>
                                        <Title style={{ fontFamily: font.bold, fontSize: 32, }}>{item.start}</Title>
                                        <Title style={{ fontSize: 32, fontFamily: font.book,}}>{item.end}</Title>
                                    </Column>
                                </Row>
                            </Pressable>
                        ))}
                    </Column>

                    <Column style={{ marginHorizontal: 20, marginVertical: 20,}}>
                        <Title style={{ fontSize: 32, letterSpacing: -1, }}>Comprometimento</Title>
                    </Column>

                </Column>
            </Scroll>

            <BottomSheet ref={details} snapPoints={[1.5, 600]} style={{ backgroundColor: "#fff", }}>
                <BottomSheetScrollView>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, }}>
                        <Pressable onPress={() => {details.current.close()}}  style={{ width: 54, height: 54, borderWidth: 1, borderColor: color.title+20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Ionicons name="close" size={24} color={color.title} />
                        </Pressable>
                        <Pressable onPress={() => {details.current.close()}}  style={{ width: 54, height: 54, borderWidth: 1, borderColor: color.title+20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Ionicons name="share-outline" size={24} color={color.title} />
                        </Pressable>
                    </Row>

                    <Column style={{ marginHorizontal: 20, marginVertical: 20, }}>
                        <Title style={{ fontSize: 42, textAlign: 'center', alignSelf: 'center', }}>{select?.title}</Title>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            {select?.team.map((tm) =>
                                    <Image  key={tm.photo} source={tm.photo} style={{ width: 52, marginRight: -12, height: 52, borderRadius: 100, borderWidth: 4, borderColor: color.background, }} />
                            )}
                        </Row>


                        <Row style={{ backgroundColor: color.off+60, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, marginTop: 12, alignItems: 'center', }}>
                            <Fontisto name="date" size={24} color={color.title} />
                            <Column style={{ marginLeft: 14, }}>
                                <Label style={{ fontSize: 24, color: color.title, fontFamily: font.medium, }}>{select?.date}</Label>
                                <Label style={{ fontSize: 20, color: color.label, }}>{select?.start} - {select?.end}</Label>
                            </Column>
                        </Row>
                        <Spacer/>

                        <Row style={{ backgroundColor: color.off+60, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12,  alignItems: 'center', }}>
                            <MaterialCommunityIcons name="church" size={24} color={color.title} />
                            <Column style={{ marginLeft: 14, }}>
                                <Label style={{ fontSize: 24, color: color.title, fontFamily: font.medium, }}>{select?.location[0]}</Label>
                                <Label style={{ fontSize: 20, color: color.label, }}>{select?.start} - {select?.location[1]}</Label>
                            </Column>
                        </Row>
                        <Spacer/>

                        <Row style={{ backgroundColor: color.off+60, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12,  alignItems: 'center', }}>
                            <MaterialIcons name="live-tv" size={24} color={color.title} />
                            <Column style={{ marginLeft: 14, }}>
                                <Label style={{ fontSize: 24, color: color.title, fontFamily: font.medium, }}>Youtube Live</Label>
                                <Label style={{ fontSize: 20, color: color.label, }}>{select?.youtube.length > 0 ? select.youtube : 'Link liberado 1h antes'}</Label>
                            </Column>
                        </Row>
                      
                        <Spacer/>

                        <Pressable style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: color.secundary, borderRadius: 100, alignSelf: 'center'}} onPress={() => {details.current.close()}} >
                            <Title>Pronto</Title>
                        </Pressable>
                       
                    </Column>





                </BottomSheetScrollView>
            </BottomSheet>
        </Main>
    )
}



const Days = () => { 

    const ts = [{
        day: 1, 
        name: 'Segunda-feira'
    },
    {
        day: 2, 
        name: 'Terça-feira'
    },
    {
        day: 3, 
        name: 'Quarta-feira'
    },
    {
        day: 4, 
        name: 'Quinta-feira'
    },
    {
        day: 5, 
        name: 'Sexta-feira'
    },
    {
        day: 6, 
        name: 'Sábado'
    },
    {
        day: 7, 
        name: 'Domingo'
    }
    ]

    const day_name = (() => {
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const dayIndex = new Date().getDay();
        return daysOfWeek[dayIndex];
    })();


    return(
        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
            {ts.map((day) => (
                <Column key={day.day} style={{ width: 52, justifyContent: 'center', alignItems: 'center', backgroundColor: day_name === day.name ? "#ffffff90" : 'transparent', borderRadius: 100, paddingTop: 10,  }}>
                    <Label style={{ fontSize: 28, opacity: 0.8, }}>{day.name.slice(0, 1)}</Label>
                    <Column style={{ backgroundColor: day_name === day.name ? '#FFF' : "transparent", justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 52, height: 52, marginTop: 6,}}>
                        <Title style={{ fontSize: 32, }}>{day.day}</Title>
                    </Column>
                </Column>
            ))}
        </Row>
    )
}