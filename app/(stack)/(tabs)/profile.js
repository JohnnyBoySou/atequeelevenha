import React, { useState, useContext, useEffect } from 'react';
import { Column, Row, Main, Scroll, Title, Label, Spacer } from '@theme/global';

import { ThemeContext } from "styled-components/native";
import { MotiImage } from 'moti';
import { ImageBackground } from 'react-native';

export default function Profile() {
  
  const { color, theme, font } = useContext(ThemeContext);
  return (
   <Main>
    <Scroll style={{ paddingVertical: 20, paddingHorizontal: 20, }}>
      <Column>
        <Row style={{ marginBottom: 20, }}>
          <Title style={{ fontFamily: 'Font_Bold', }}>Progresso</Title>
        </Row>
        <MotiImage 
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          source={{ uri: 'https://i.pinimg.com/736x/55/79/e6/5579e6c7d0b10604ffd14d33c22b719d.jpg' }}
          style={{ width: 300, height: 400, borderRadius: 6, alignSelf: 'center', resizeMode: 'cover'}}
        />


          <Column>
            <Title style={{ fontSize: 52, fontFamily: font.bold, letterSpacing: -2, marginTop: 20, }}>Desbravador</Title>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
              <Label>124 XP / 200 XP</Label>
              <Column style={{ width: 100, backgroundColor: "#30303040", borderRadius: 100, height: 14, }}>
                  <Column style={{ width: '60%', backgroundColor: '#8A96FF', height: 14, borderRadius: 100, }}/>
              </Column>
            </Row>
          </Column>


      <Row style={{ marginVertical: 20, }}>
        <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/b0/87/6c/b0876c09b09042be69df24cb80bc4d51.jpg'}} imageStyle={{borderRadius: 10,}} style={{ flexGrow: 1, }}>
          <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: color.background, paddingHorizontal: 12, flexGrow: 1, paddingVertical: 30, borderRadius: 6, margin: 5,}}>
            <Title style={{ fontSize: 52, }}>12</Title>
            <Label style={{ textAlign: 'center', }}>Task’s {'\n'}Completas</Label>
          </Column>
        </ImageBackground>
        <Spacer />
        <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/2a/a4/74/2aa4749008acf6b67147b448719cdfdf.jpg'}} imageStyle={{borderRadius: 10,}} style={{ flexGrow: 1, }} blurRadius={10}>
          <Column style={{ justifyContent: 'center', alignItems: 'center',  backgroundColor: color.background, paddingHorizontal: 12, flexGrow: 1, paddingVertical: 30, borderRadius: 6, margin: 5,}}>
            <Title style={{ fontSize: 52, }}>7</Title>
            <Label style={{ textAlign: 'center', }}>Dias{'\n'}Completos</Label>
          </Column>
        </ImageBackground>
      </Row>

      </Column>
    </Scroll>
   </Main>
  );
}
