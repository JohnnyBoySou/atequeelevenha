import React, { useState, useEffect, useContext } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { Pressable, Image,  ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MotiImage, MotiView } from 'moti';
import { router, useLocalSearchParams } from 'expo-router';
import { verifyPin } from '@hooks/usePin';
import { ThemeContext } from 'styled-components/native';
import { deletePin, addPin } from '@hooks/usePin';
import Animated from 'react-native-reanimated';



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
            <Image blurRadius={10} source={{ uri: item.image }} style={{ width: '100%', height: '110%', position: 'absolute', top: 0, left: 0, paddingVertical: 40, }} />
                    <Pressable onPress={() => router.back()} style={{ zIndex: 100, width: 42, height: 42, borderRadius: 100, marginLeft: 30, backgroundColor: '#fff', marginBottom: 12, justifyContent: 'center', alignItems: 'center',  marginTop: 12,}}>
                        <AntDesign name="arrowleft" size={28} color={color.title} />
                    </Pressable>

                    <Animated.Image sharedTransitionTag={item.id.toString()}  style={{ width: '80%', aspectRatio: selectAspect, borderRadius: 18, alignSelf: 'center' }} source={{ uri: item?.image }} />
                   
                    <Pressable onPress={togglePin} style={{ paddingVertical: 10, flexDirection: 'row', paddingHorizontal: 20, marginTop: 25, alignSelf:'center', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: like ? color.red : color.red+50, }}>
                        <Title style={{ color: like ? "#fff" : color.red, marginRight: 6,}}>{like ? 'Curtido' : 'Curtir'}</Title>
                        <AntDesign name={like ? 'heart' : 'hearto'} size={22} color={like ? "#FFF" : color.red} />
                    </Pressable>
        </Main>
    )
}