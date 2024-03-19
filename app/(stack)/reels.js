import React, { useContext, useRef, useState, useEffect } from "react";
import { Animated, FlatList, Image, Pressable } from "react-native";
import { Main, Scroll, Title, Column, Label, Row, Spacer,  } from "@theme/global";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from 'styled-components/native';
import { getShorts, getShortsPopular, getShortsRecents } from "@api/shorts";

export default function ReelsPage(  { navigation }) {

    const [shorts, setShorts] = useState([]);
    const [popular, setpopular] = useState();
    const [recents, setrecents] = useState();
    const { color, font } = useContext(ThemeContext);

    useEffect(() => {
        getShorts().then((res) => {  setShorts(res);  }  );
        getShortsPopular().then((res) => {  setpopular(res.reverse());  }  );
        getShortsRecents().then((res) => {  setrecents(res);  }  );
    }, [])

    return(
        <Main>
            <Scroll>
                <Column>
                    <Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.tree, flexGrow: 1, height: 84, borderBottomRightRadius: 32, borderTopLeftRadius: 32,}}></Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.four, flexGrow: 2, height: 84, borderBottomRightRadius: 32, borderTopLeftRadius: 32,}}></Row>
                    </Row>

                    <Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 2, backgroundColor: color.secundary, height: 84, borderTopRightRadius: 32, borderBottomLeftRadius: 32,}}></Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, backgroundColor: color.primary, height: 84, borderBottomRightRadius: 32, borderTopLeftRadius: 32, }}></Row>
                    </Row>
                    <Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.four, height: 84, flexGrow: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32, borderBottomLeftRadius: 32,}}></Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.tree, height: 84, flexGrow: 1, borderTopRightRadius: 32,}}></Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.secundary, height: 84, flexGrow: 1, borderBottomLeftRadius: 32,}}></Row>
                    </Row>
                </Column>
                <Column style={{ paddingHorizontal: 20,  marginTop: 20,}}>
                    <Title style={{ fontSize: 52, }}>Veja nossos Shorts</Title>
                    
                    <Title style={{ fontSize: 32, marginTop: 20, }}>Recentes</Title>
                    <Shorts shorts={recents}/>

                    <Title style={{ fontSize: 32, marginTop: 20, }}>Populares</Title>
                    <Shorts shorts={popular}/>
                    <Spacer height={100} />


                </Column>

            </Scroll>
        </Main>
    )
}


const Shorts = ({ shorts }) => {
    const { color, font } = useContext(ThemeContext);
    const navigation = useNavigation();

    const Video = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate('ShortDetails', { item: item, })} style={{ width: 190, height: 272, backgroundColor: "#DF8E3C", marginLeft: 20,  borderRadius: 16, }}>
                <Image source={{uri: item?.url}} style={{ width: 190, height: 272, borderRadius: 16, }} resizeMode='cover' />
            </Pressable>
        )
    }
   
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Column style={{ marginTop: 16, }}>
            <FlatList
                data={shorts}
                renderItem={({ item, index }) => <Video item={item} index={index} />}
                keyExtractor={item => item.id}
                style={{ marginHorizontal: -20, paddingRight: 40,}}
                horizontal
                decelerationRate={0.8}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{nativeEvent:{contentOffset: { x: scrollX } } }], {useNativeDriver: false, }
                  )}
            />
           
        </Column>
    )
}
