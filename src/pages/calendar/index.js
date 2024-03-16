import React, { useContext, useRef, useState } from 'react';
import { Column, Label, Main, Title, Scroll, Row } from '../../theme/global';
import { FlatList, Pressable } from 'react-native';
import { MotiImage } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import {Modalize} from 'react-native-modalize';
import { ThemeContext } from 'styled-components/native';

export default function CalendarPage({ navigation }) {
    let item = [
        {date: '22 de Junho', status: 'Incompleto', time: 'às 10:00h', pastor: 'Pastor João Sousa', tema: 'O que Deus nos orienta'},
        {date: '23 de Junho', status: 'Completo', time: 'às 10:00h', pastor: 'Pastor João Sousa', tema: 'As mudanças na nossa vida'},
        {date: '24 de Junho', status: 'Bloqueado', time: 'Não disponível', pastor: 'Secreto', tema: 'Secreto'},
    ]

    const adjustDate =useRef(null);
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Dezembro']
    const [month, setMonth] = useState('Junho');
    const [week, setWeek] = useState('4ª Semana');
    const weeks = ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']

    const { color } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: 20,  marginVertical: 20,}}>
                    <Pressable onPress={() => navigation.goBack()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100,}}>
                        <AntDesign name="arrowleft" size={32} color="#fff" />
                    </Pressable>
                    <Row>
                        <Column>
                        <Title style={{ fontSize: 42, }}>Calendário</Title>
                        <Label>Acompanhe seu progresso diário</Label>
                        </Column>
                        <MotiImage source={require('../../assets/imgs/gradient.png')} style={{ width: 530, height: 400, marginTop: -320, }} resizeMode='cover' />
                    </Row>

                <Pressable onPress={() => {adjustDate.current?.open()}}  style={{ flexDirection: 'row', backgroundColor: "#303030", borderRadius: 8, marginBottom: 12, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, }}>
                    <Title style={{ fontSize: 32, marginVertical: 20, }}>Essa semana</Title>
                    <Column style={{ width: 52, height: 52, borderRadius: 6, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',  }}>
                        <AntDesign name='arrowright' size={24} color='#FFFFFF' style={{ }} />
                    </Column>                        
                </Pressable>

                <Row style={{ marginBottom: 4, justifyContent: 'space-between', alignItems: 'center', marginTop: 12,}}>
                    <Title style={{ fontSize: 32, marginVertical: 10, }}>Dias</Title>
                    <Row>
                        <Pressable style={{ backgroundColor: '#fff', borderRadius: 100, paddingHorizontal: 20, paddingVertical:10, marginRight: 10,}}> 
                            <Label style={{ color: "#000", }}>{month}</Label>
                        </Pressable>
                        <Pressable style={{ backgroundColor: '#fff', borderRadius: 100, paddingHorizontal: 20, paddingVertical:10, }}> 
                            <Label style={{ color: "#000", }}>{week}</Label>
                        </Pressable>
                    </Row>
                </Row>

                <FlatList
                    data={item}
                    renderItem={({ item }) => <Days item={item} />}
                    keyExtractor={item => item.date}
                    style={{ marginTop: -20,}}
                    />

                    </Column>                
            </Scroll>
            <Modalize ref={adjustDate} adjustToContentHeight handlePosition='inside'>
                <Main style={{ paddingVertical: 20, }}>
                    <Title style={{ marginLeft: 20, }}>Calendário</Title>
                    <Label style={{ marginLeft: 20, marginBottom: 10,}}>Escolha o mês e a semana</Label>
                    <Row style={{ marginVertical: 10, }}>
                        <FlatList
                            data={months}
                            style={{ height: 300, marginLeft: -30, marginRight: 10,}}
                            renderItem={({ item, index }) => <Pressable onPress={() => setMonth(item)} style={{ backgroundColor: month === item ? "#3E59AE" : "#303030", paddingVertical: 20, borderRadius: 100, marginVertical: 10, paddingRight: 30, }}>
                                <Label style={{ color: "#FFFFFF", fontSize: 42, textAlign: 'right' }}>{item}</Label>
                            </Pressable>}
                            keyExtractor={item => item}
                            showsVerticalScrollIndicator={false}
                            />

                        <FlatList
                            data={weeks}
                            style={{ height: 300, marginRight: -50, marginLeft:10,}}
                            renderItem={({ item,  }) => <Pressable onPress={() => setWeek(item)} style={{ backgroundColor: week === item ? "#fff" : "#3E59AE",  paddingVertical: 20, borderRadius: 100, marginVertical: 10, borderWidth: 2, borderColor: "#fff", paddingLeft: 30,}}>
                                <Label style={{ color: week === item ? '#3E59AE' : "#FFFFFF",  fontSize: 42, textAlign: 'left' }}>{item}</Label>
                            </Pressable>}
                            keyExtractor={item => item}
                            showsVerticalScrollIndicator={false}
                            />

                    </Row>
                    <Pressable onPress={() => {adjustDate.current?.close()}} >
                        <Label style={{ backgroundColor: "#3E59AE", alignSelf:'center', borderRadius: 100, paddingVertical: 12, paddingHorizontal: 32, textAlign: 'center', color: "#FFFFFF", }}>Salvar</Label>
                    </Pressable>
                </Main>

            </Modalize>
        </Main>
    )
    }

const Days = ({ item }) => { 
    return(
        <Column style={{ backgroundColor: item?.status === 'Completo' ? "#3E59AE" : "#303030", padding: 12, borderRadius: 12,  marginTop: 20, paddingHorizontal: 20,}}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                <Title>{item.date}</Title>
                <Label style={{ backgroundColor: "#FFFFFF30", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100,}}>{item.status}</Label>
            </Row>
            <Title style={{ fontSize: 32,  marginVertical: 12,fontFamily: 'Font_Book', }}>{item.tema}</Title>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginTop: 10,}}>
                <Label>{item.time}</Label>
                <Label>{item.pastor}</Label>
             </Row>   
        </Column>
    )
 }