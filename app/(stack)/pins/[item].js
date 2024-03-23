import React, { useState, useEffect, useContext } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { Pressable, Image,  ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MotiImage, MotiView } from 'moti';
import { router, useLocalSearchParams } from 'expo-router';
import { verifyPin } from '@hooks/usePin';
import { ThemeContext } from 'styled-components/native';
import { deletePin, addPin } from '@hooks/usePin';




export default function PinDetails() {
    const { color, font	} = useContext(ThemeContext)
    const { it } = useLocalSearchParams();
    const item = JSON.parse(it)
    const [like, setlike] = useState();
    const [selectAspect, setselectAspect] = useState(1)

    useEffect(() => {
        if (item?.image) {
            Image.getSize(item.image, (width, height) => {
            setselectAspect(width / height)
            })
        }
        verifyPin(item).then((res) => {
            setlike(res)
        })
    }, [])

    const togglePin = () => { 
        if(like){
            deletePin(item).then((res) => {
                setlike(res)
            })
        }else{
            addPin(item).then((res) => {
                setlike(res)
            })
        }
     }


   

    return (
        <Main>
            <Scroll>
                <MotiView  from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0, }}>
                    <ImageBackground blurRadius={50} source={{ uri: item.image }} style={{ flexGrow: 1, paddingVertical: 40, marginTop:20, marginHorizontal: 12,}} imageStyle={{borderRadius: 32,}}>
                        <MotiImage from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0, }} transition={{delay: 300, duration: 300,}} style={{ width: '80%', aspectRatio: selectAspect, borderRadius: 18, alignSelf: 'center' }} source={{ uri: item?.image }} />
                    </ImageBackground>
                    

                    <Row>

                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 42, height: 42, borderRadius: 100, marginLeft: 30, backgroundColor: '#00000010', justifyContent: 'center', alignItems: 'center',  marginTop: 12,}}>
                        <AntDesign name="arrowleft" size={28} color={color.title} />
                    </Pressable>

                    <Title style={{ fontSize: 24, width: '70%', marginHorizontal: 12, letterSpacing: -1, fontFamily: font.medium, marginVertical: 12,}}>{item?.title}</Title>

                    </Row>
                   

                    <Pressable onPress={togglePin} style={{ paddingVertical: 10, flexDirection: 'row', paddingHorizontal: 20, alignSelf:'center', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: like ? color.red : color.red+20, }}>
                        <Title style={{ color: like ? "#fff" : color.red, marginRight: 6,}}>{like ? 'Curtido' : 'Curtir'}</Title>
                        <AntDesign name={like ? 'heart' : 'hearto'} size={22} color={like ? "#FFF" : color.red} />
                    </Pressable>
                  
                </MotiView>
            </Scroll>
        </Main>
    )
}