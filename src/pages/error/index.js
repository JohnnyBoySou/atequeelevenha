import React from "react";
import { Pressable } from "react-native";
import { Title, Column, Main } from "../../theme/global";

export default function Error({ navigation}){
    return (
        <Main>
        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
            <Title>Páginas</Title>
            <Pressable style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }} onPress={() => {navigation.navigate('Home')}} >
                <Title>Home</Title>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('Post')}} style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }}>
                <Title>Post</Title>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('Prey')}} style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }}>
                <Title>Prey</Title>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('Calendar')}} style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }}>
                <Title>Calendar</Title>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('Reels')}} style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }}>
                <Title>Reels</Title>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('ReelsScroll')}} style={{ backgroundColor: "#3E59AE", paddingHorizontal: 20, paddingVertical: 12, marginVertical: 12, }} >
                <Title>ReelsScroll</Title>
            </Pressable>
        </Column>
        </Main>

    )
}