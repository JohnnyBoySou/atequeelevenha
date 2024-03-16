import React, { useState, useRef } from "react";
import { MotiImage } from "moti";
import { Column, Label, Main, Title, Row, Scroll } from "../../theme/global";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { AntDesign, FontAwesome6, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('window');

export default function ShortDetails({ route, navigation,  }) {
  const item = route.params?.item;
  const [like, setLike] = useState(false);
  const aboutModal = useRef(null);
  return (
    <>
    <Main>
      <Pressable onPress={() => {navigation.goBack()}} style={{ width: 80, height: 12, marginBottom: -20, borderRadius: 100, backgroundColor: "#303030", zIndex: 99, alignSelf: 'center', marginVertical: 10, }}  />
      <MotiImage source={{ uri: item.url }} style={{ width: width, height: 0.9 * height, backgroundColor: "#404040", borderRadius: 12,}} resizeMode="cover" />	

     
      
    </Main>

      <BottomSheet ref={aboutModal} snapPoints={[90, 350, '80%']} backgroundStyle={{backgroundColor: "#171717", }} handleIndicatorStyle={{backgroundColor: "#d7d7d760"}}>
        <BottomSheetScrollView>

          <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: 20, paddingBottom: 20, marginTop: 0, borderBottomColor: "#303030", borderBottomWidth: 2,}}>
            <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
              <Pressable onPress={() => navigation.goBack()}  style={{ width: 42, height: 42, borderRadius: 100, marginLeft: -10, justifyContent: 'center', alignItems: 'center', }}>
                    <AntDesign name="arrowleft" size={18} color="#fff" />
                </Pressable>
              <Title style={{ fontSize: 28 }}>Sobre</Title>
            </Row>
            <Row>
              <Pressable style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: "#303030", justifyContent: 'center', alignItems: 'center', }}>
                {like ?<AntDesign name="heart" size={18} color="#fff" /> : <AntDesign name="hearto" size={18} color="#fff" />}
              </Pressable>
              <Pressable   style={{ width: 42, height: 42, marginLeft: 8, borderRadius: 100, backgroundColor: "#303030", justifyContent: 'center', alignItems: 'center', }}>
                  <FontAwesome6 name="share" size={18} color="#fff" />
              </Pressable>
            </Row>
          </Row>


          <Column style={{ padding: 20, }}>
            <Title style={{ fontSize: 32, marginBottom: 10, }}>{item.title}</Title>
            <Label>{item.desc}</Label>


            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <MaterialCommunityIcons name="hands-pray" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Agradecer</Label>
              </Pressable>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <FontAwesome6 name="hands-clapping" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Palmas</Label>
              </Pressable>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#ffffff70",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <Fontisto name="bookmark" size={18} color="#fff" />
                <Label style={{ marginLeft: 10, }}>Favoritar</Label>
              </Pressable>
            </Row>


            <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginTop: 20, marginHorizontal: -20, paddingHorizontal: 20, borderTopColor: '#303030', borderTopWidth: 2, }}>
              <Title>Veja mais</Title>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#303030",  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                <MaterialCommunityIcons name="play" size={24} color="#fff" />
                <Label style={{ marginHorizontal: 10, }}>Assistir</Label>
              </Pressable>
            </Row>
            <ScrollView horizontal>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
              <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
           
            </ScrollView>

            <Column>
              <Title>Anúncio</Title>
              <Column style={{ flexGrow: 1, marginVertical: 12, backgroundColor: "#303030", borderRadius: 12, height: 200, }}></Column>
            </Column>
          </Column>

        </BottomSheetScrollView>
      </BottomSheet>
   
    </>

  );
}
