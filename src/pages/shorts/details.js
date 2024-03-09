import React, { useState } from "react";
import { MotiImage } from "moti";
import { Column, Main, Title } from "../../theme/global";
import { Dimensions, Pressable } from "react-native";
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function ShortDetails({ route, navigation,  }) {
  const item = route.params?.item;
  const [like, setLike] = useState(false);
  return (
    <Main >
      <Pressable onPress={() => {navigation.goBack()}} style={{ width: 80, height: 12, marginBottom: -20, borderRadius: 100, backgroundColor: "#303030", zIndex: 99, alignSelf: 'center', marginVertical: 10, }}  />
      <MotiImage source={{ uri: item.capa }} style={{ width: width, height: height, backgroundColor: "#404040", borderRadius: 12,}} resizeMode="cover" />	

      <Column style={{ position: 'absolute', right: 30, bottom: 30, }}>
        <Pressable style={{ width: 54, height: 54, borderRadius: 100, backgroundColor: "#161616", justifyContent: 'center', alignItems: 'center', }}>
            {like ?<AntDesign name="heart" size={32} color="#fff" /> : <AntDesign name="hearto" size={32} color="#fff" />}
        </Pressable>
        <Pressable style={{ width: 54, height: 54, borderRadius: 100, marginTop: 10, backgroundColor: "#161616", justifyContent: 'center', alignItems: 'center', }}>
            <FontAwesome6 name="share" size={24} color="#fff" />
        </Pressable>
      </Column>
    </Main>
  );
}
