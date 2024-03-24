import React, { useContext, useState } from 'react';
import { Column, Row, Title, Label, Scroll, Main, Spacer } from '@theme/global';
import { Image, Dimensions, Pressable, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

export default function NotificationsPage({navigation }) {
    const {color, font} = useContext(ThemeContext);

 

 return (
        <Main>
            <Scroll >
                <Column style={{  paddingHorizontal: 20, paddingBottom: 32, }}>
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 52, height: 52, borderRadius: 100,}}>
                        <AntDesign name="arrowleft" size={32} color={color.title} />
                    </Pressable>

                    <Row style={{justifyContent: 'space-between', aligItems: 'center', }}> 
                        <Column>
                            <Title style={{ fontSize: 52, }}>Notificações</Title>
                        </Column>
                       
                    </Row>
                    
                    
                </Column>
             </Scroll>
        </Main>
    );
}