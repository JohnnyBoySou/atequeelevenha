import React, { useContext, useEffect, useRef, useState } from 'react';
import { Column, Row, Title, Label, Scroll, Main, Spacer, HeadTitle } from '../theme/global';
import { Image, TouchableOpacity, Dimensions, FlatList, Pressable, TextInput } from 'react-native';
import { AntDesign, FontAwesome5, Feather, Ionicons, Fontisto, FontAwesome } from '@expo/vector-icons';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
const { width, height } = Dimensions.get('window');

export default function PreyPage({navigation }) {
    const [name, setname] = useState();
    const [telefone, settelefone] = useState();
    const [who, setWho] = useState('Myself');
    const [pedido, setpedido] = useState('');

    const {color, font} = useContext(ThemeContext);

    function maskPhone(value){
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2 ");
        value = value.replace(/(\d)(\d{5})$/, "$1-$2");
        value = value.slice(0, 16);
        return value;
      }

    function handleChange(text) {
        const value = maskPhone(text)
        settelefone(value)
    }

    //<MotiImage source={require('@assets/imgs/gradient.png')} style={{ width: 260, right: -100, height: 200, position: 'absolute', }} resizeMode='cover' />

 return (
        <Main>
            <Scroll >
                <Column style={{  paddingHorizontal: 20, paddingBottom: 32, }}>
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100,}}>
                        <AntDesign name="arrowleft" size={32} color={color.title} />
                    </Pressable>
                    <Title style={{ fontSize: 52, }}>Oração</Title>
                    <Label style={{ fontSize: 22, }}>Realize seu pedido de oração</Label>
                    
                    <Spacer height={24} />
                    <Title style={{ fontSize: 28,}}>Nome completo</Title>
                    <TextInput value={name} onChangeText={setname} placeholderTextColor={color.title+30} placeholder='Ex.: João de Jesus'autoComplete='name'  style={{ backgroundColor: color.off, marginTop: 8,marginBottom: 12, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, fontSize: 24, color: color.title, fontFamily: 'Font_Medium', borderWidth: 2, borderColor: name?.includes(' ') ? '#27AE60': color.off,}}	/>
                    
                    <Title style={{ fontSize: 28,}}>Telefone</Title>
                    <TextInput value={telefone} placeholderTextColor={color.title+30} placeholder='Ex.: (47) 9 9876-5432' autoComplete='tel' keyboardType='numeric' onChangeText={(text) => handleChange(text)}  style={{ backgroundColor: color.off, marginTop: 8,marginBottom: 12, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, fontSize: 24, color:color.title, fontFamily: 'Font_Medium', borderWidth: 2, borderColor: telefone?.length == 16 ? '#27AE60': color.off,}}	/>

                    <Title style={{ fontSize: 28, marginBottom: 12,}}>É direcionado a quem</Title>
                    <Row style={{ justifyContent: 'space-evenly', alignItems: 'center',  }}>
                        <Column>
                            <Pressable onPress={() => {setWho('myself')}}  style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: who === 'myself' ? "#27AE60" : color.off, justifyContent: 'center', alignItems: 'center',  }}>
                                <Image source={{uri: 'https://em-content.zobj.net/source/whatsapp/116/person-bowing-deeply_1f647.png'}} style={{ width: 54, height: 54, }} />
                            </Pressable>
                            <Title style={{ fontFamily: font.book,  textAlign: 'center', marginTop: 4, fontSize: 22}}>A mim</Title>
                        </Column>
                        <Column>
                            <Pressable onPress={() => {setWho('family')}}  style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: who === 'family' ? "#27AE60" : color.off, justifyContent: 'center', alignItems: 'center',  }}>
                                <Image source={{uri: 'https://em-content.zobj.net/source/whatsapp/390/family-man-woman-boy_1f468-200d-1f469-200d-1f466.png'}} style={{ width: 54, height: 54, }} />
                            </Pressable>
                            <Title style={{ fontFamily: font.book,  textAlign: 'center', marginTop: 4, fontSize: 22}}>Família</Title>
                        </Column>
                        <Column>
                            <Pressable onPress={() => {setWho('friend')}}  style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: who === 'friend' ? "#27AE60" : color.off, justifyContent: 'center', alignItems: 'center',  }}>
                                <Image source={{uri: 'https://em-content.zobj.net/source/apple/391/handshake_1f91d.png'}} style={{ width: 54, height: 54, }} />
                            </Pressable>
                            <Title style={{ fontFamily: font.book,  textAlign: 'center', marginTop: 4, fontSize: 22}}>Amigo</Title>
                        </Column>
                        <Column>
                            <Pressable onPress={() => {setWho('other')}}  style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: who === 'other' ? "#27AE60" : color.off, justifyContent: 'center', alignItems: 'center',  }}>
                                <Image source={{uri: 'https://em-content.zobj.net/source/apple/391/man-raising-hand_1f64b-200d-2642-fe0f.png'}} style={{ width: 54, height: 54, }} />
                            </Pressable>
                            <Title style={{ fontFamily: font.book,  textAlign: 'center', marginTop: 4, fontSize: 22}}>Conhecido</Title>
                        </Column>
                    </Row>
                
                    <Title style={{ fontSize: 28, marginTop: 12,}}>Pedido</Title>
                    <TextInput value={pedido} maxLength={300} placeholderTextColor={color.title+30} placeholder='Escreva o seu pedido' onChangeText={setpedido}  style={{ backgroundColor: color.off, marginTop: 8,marginBottom: 12, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, fontSize: 20, letterSpacing: 0.4, lineHeight: 24, color: color.title, fontFamily: font.book, borderWidth: 2, borderColor: pedido?.length > 16 ? '#27AE60': color.off, textAlign: 'left', textAlignVertical: 'top',}}	multiline numberOfLines={6} autoCorrect />
                    <Label>Limite de letras {pedido?.length}/300</Label>
                
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 10,   }}>
                        <Pressable style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: color.off, borderRadius: 100, }}>
                            <Title style={{ color: color.title, letterSpacing: 0, fontFamily: font.book, fontSize: 20 }}>Salvar e voltar</Title>
                        </Pressable>
                        <Pressable onPress={() => {navigation.navigate('Prey')}}  style={{ paddingHorizontal: 32, paddingVertical: 12, borderRadius: 100, backgroundColor: color.green, justifyContent: 'center', alignItems: 'center',  alignSelf:'center' ,}}>
                            <Title style={{ color: "#fff", letterSpacing: -1, }}>Fazer Pedido</Title>
                        </Pressable>
                    </Row>
                </Column>



















             </Scroll>
        </Main>
    );
}