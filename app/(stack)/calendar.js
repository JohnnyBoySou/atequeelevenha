import React, { useContext, useRef, useState } from 'react';
import { Column, Label, Main, Title, Scroll, Row } from '@theme/global';
import { FlatList, Pressable } from 'react-native';
import { MotiImage } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import BottomSheet , { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function CalendarPage({ navigation }) {
    let item = [
        {date: '22 de Junho', status: 'Incompleto', time: 'às 10:00h', pastor: 'Pastor João Sousa', tema: 'O que Deus nos orienta'},
        {date: '23 de Junho', status: 'Completo', time: 'às 10:00h', pastor: 'Pastor João Sousa', tema: 'As mudanças na nossa vida'},
        {date: '24 de Junho', status: 'Bloqueado', time: 'Não disponível', pastor: 'Secreto', tema: 'Secreto'},
    ]

    const adjustDate = useRef(null);
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Dezembro']
    const [month, setMonth] = useState('Junho');
    const [week, setWeek] = useState('4ª Semana');
    const weeks = ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana']

    const { color, theme } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: 20, marginBottom: 50,}}>
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100,}}>
                        <AntDesign name="arrowleft" size={32} color={color.title} />
                    </Pressable>
                    <Row>
                        <Column>
                        <Title style={{ fontSize: 42, }}>Calendário</Title>
                        <Label>Acompanhe seu progresso diário</Label>
                        </Column>
                        <MotiImage source={require('@assets/imgs/gradient.png')} style={{ width: 530, height: 400, marginTop: -320, }} resizeMode='cover' />
                    </Row>

                <Pressable onPress={() => {adjustDate.current?.expand()}}  style={{ flexDirection: 'row', backgroundColor: color.off, borderRadius: 8, marginBottom: 12, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, }}>
                    <Title style={{ fontSize: 32, marginVertical: 20, }}>Essa semana</Title>
                    <Column style={{ width: 52, height: 52, borderRadius: 6, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center',  marginRight: -10,}}>
                        <AntDesign name='arrowright' size={24} color='#FFFFFF'/>
                    </Column>                        
                </Pressable>

                <Row style={{ marginBottom: 4, justifyContent: 'space-between', alignItems: 'center', marginTop: 12,}}>
                    <Title style={{ fontSize: 32, marginVertical: 10, }}>Dias</Title>
                    <Row>
                        <Pressable style={{ backgroundColor: color.secundary, borderRadius: 100, paddingHorizontal: 20, paddingVertical:10, marginRight: 10,}}> 
                            <Label style={{ color: color.title, }}>{month}</Label>
                        </Pressable>
                        <Pressable style={{ backgroundColor: color.secundary, borderRadius: 100, paddingHorizontal: 20, paddingVertical:10, }}> 
                            <Label style={{ color:color.title, }}>{week}</Label>
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
            <BottomSheet ref={adjustDate} snapPoints={[0.1,  480]} style={{ backgroundColor: color.background, }} >
                <BottomSheetScrollView style={{ backgroundColor: color.background, }}>
                    <Column>
                    <Title style={{ marginLeft: 20, }}>Calendário</Title>
                    <Label style={{ marginLeft: 20, marginBottom: 10,}}>Escolha o mês e a semana</Label>
                    <Row style={{ marginVertical: 10, }}>
                        <FlatList
                            data={months}
                            style={{ height: 300, marginLeft: -30, marginRight: 10,}}
                            renderItem={({ item, index }) => <Pressable onPress={() => setMonth(item)} style={{ backgroundColor: month === item ? "#3E59AE" : color.off, paddingVertical: 20, borderRadius: 100, marginVertical: 10, paddingRight: 30, }}>
                                <Label style={{ color:  month === item ? "#fff" : color.title, fontSize: 42, textAlign: 'right' }}>{item}</Label>
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
                    </Column>

                </BottomSheetScrollView>

            </BottomSheet>
        </Main>
    )
    }

const Days = ({ item }) => { 
    
    const { color, theme } = useContext(ThemeContext);
    return(
        <Column style={{ backgroundColor: item?.status === 'Completo' ? "#3E59AE" : color.off, padding: 12, borderRadius: 12,  marginTop: 20, paddingHorizontal: 20,}}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                <Title style={{ color: item?.status === 'Completo' ? "#fff" : color.title, letterSpacing: -1, }}>{item.date}</Title>
                <Label style={{ backgroundColor: "#FFFFFF50", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, color: item?.status === 'Completo' ? "#fff" : color.label,}}>{item.status}</Label>
            </Row>
            <Title style={{ fontSize: 32,  marginVertical: 12,fontFamily: 'Font_Book', color: item?.status === 'Completo' ? "#fff" : color.title,}}>{item.tema}</Title>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginTop: 10,}}>
                <Label style={{ color: item?.status === 'Completo' ? "#fff" : color.label, }}>{item.time}</Label>
                <Label style={{ color: item?.status === 'Completo' ? "#fff" : color.label, }}>{item.pastor}</Label>
             </Row>   
        </Column>
    )
 }