import React, { useContext, useRef, useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { Main, Title, Column, Label, Row,  } from "@theme/global";
import { ThemeContext } from 'styled-components/native';
import { getShortsRecents } from "@api/shorts";
import { AntDesign, FontAwesome6, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Video, ResizeMode } from 'expo-av';
import { AnimatePresence, MotiImage, MotiView } from "moti";
import{ useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ReelsScrollPage({ navigation }) {

    const [shorts, setShorts] = useState([]);
    const [recents, setrecents] = useState();
    const { color, font } = useContext(ThemeContext);
    const [current, setcurrent] = useState();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          setloading(true)
          getShortsRecents().then((res) => {  setrecents(res);  setloading(false)}  );
        }
        fetchData()
    }, [])

    const onViewableItemsChanged = ({ viewableItems }) => {
        setcurrent(viewableItems[0].item.id);
    };
    const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
    const a = false
    return(
        <Main>
          {loading &&
              <Column style={{ marginTop: 20, }}>
                  <ActivityIndicator size={72} color="#142B74" />
                  <Label style={{ textAlign: 'center', fontSize: 24, marginTop: 20, fontFamily: font.medium, }}>Deixando tudo pronto!</Label>
              </Column>
            }
          {!loading &&
            <FlatList
                data={recents}
                renderItem={({ item }) => <ShortList item={item} current={current}/>}
                keyExtractor={item => item.id}
                style={{ }}
                pagingEnabled
                horizontal
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                showsHorizontalScrollIndicator={false}
            />}
        </Main>
    )
}


export function ShortList({ item, current,  }) {
    const { color, font, theme } = useContext(ThemeContext);
    const aboutModal = useRef(null);
    const video = useRef(null);
    const [type, settype] = useState('about');
    const [like, setLike] = useState(false);
    const [isPlay, setisPlay] = useState(true);
    const [time, settime] = useState(0);
    const togglePlay = () => { if(!item.id == current){return} if (isPlay) { video.current.pauseAsync(); setisPlay(false)} else {video.current.playAsync(); setisPlay(true)}}
    const navigation = useNavigation();
    useEffect(() => {
        if(item.id == current){
          //  video.current.playAsync();
        }else{
         //   video.current.pauseAsync();
        }
    }, [current])



    const a = false
    return (
      <>
      <Main>
        <Pressable onPress={() => {router.back()}} style={{ width: 80, height: 12, borderRadius: 100, backgroundColor: "#505050", zIndex: 99, alignSelf: 'center', position: 'absolute', top: 20, }}  />
        <Column style={{ width: time+'%', height: 5, position: 'absolute', top: 0, borderRadius: 100, backgroundColor: "#fff", zIndex: 99,  }}/>
        <Video
            ref={video}
            style={{  width: width, height: 1.1 * height, top: -20, borderRadius: 12, backgroundColor: '#404040', }}
            source={{ uri: item?.video }}
            resizeMode={ResizeMode.COVER}
            isLooping
            onLoad={() => {togglePlay(); setisPlay(!isPlay); }}
            onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0)) }
            progressUpdateIntervalMillis={50}
          />


        <Pressable style={{ width: width, height: height, backgroundColor: "#30303000", position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', }} onPress={() =>{togglePlay(); setisPlay(!isPlay)}}>
          <AnimatePresence>
          {isPlay ? 
            <MotiView from={{ opacity: 1,}} animate={{ opacity: 0,}}>
              <FontAwesome6 name="play" size={42} color="#fff" />
            </MotiView> : 
            <MotiView from={{ opacity: 0,}} animate={{ opacity: 1,}}>
              <FontAwesome6 name="pause" size={42} color="#fff" />
            </MotiView>
          }
          </AnimatePresence>
        </Pressable>
      </Main>
  
        <BottomSheet ref={aboutModal} snapPoints={[90, 350, '80%']} backgroundStyle={{backgroundColor: color.background, }} handleIndicatorStyle={{backgroundColor: "#d7d7d760"}}>
          <BottomSheetScrollView>
  
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: 20, paddingBottom: 20, marginTop: 0, borderBottomColor: color.off, borderBottomWidth: 2,}}>
              <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
  
                <Pressable  style={{ backgroundColor: color.title,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                  <Label style={{ color: theme == 'dark' ? "#000" : "#fff" }}>Sobre</Label>
                </Pressable>

              </Row>
              <Row>
                <Pressable style={{ width: 42, height: 42, borderRadius: 100, backgroundColor: color.off, justifyContent: 'center', alignItems: 'center', }}>
                  {like ?<AntDesign name="heart" size={18} color={color.title} /> : <AntDesign name="hearto" size={18} color={color.title} />}
                </Pressable>
                <Pressable   style={{ width: 42, height: 42, borderRadius: 100, marginLeft: 12, backgroundColor: color.off, justifyContent: 'center', alignItems: 'center', }}>
                    <FontAwesome6 name="share" size={18} color={color.title} />
                </Pressable>
              </Row>
            </Row>
  
           
  
           <MotiView from={{ opacity: 0, translateY: 40,}} animate={{ opacity: 1, translateY: 0,}} transition={{ type: 'timing', duration: 300,}}><Column style={{ padding: 20, }}>
              <Title style={{ fontSize: 32, marginBottom: 10, }}>{item.title}</Title>
              <Label>{item.desc}</Label>
  
              <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
              <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: color.title,  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                  <MaterialCommunityIcons name="hands-pray" size={18} color={color.title} />
                  <Label style={{ marginLeft: 10, }}>Agradecer</Label>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: color.title,  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                  <FontAwesome6 name="hands-clapping" size={18} color={color.title} />
                  <Label style={{ marginLeft: 10, }}>Palmas</Label>
                </Pressable>
               
              </Row>
  
  
             {a && <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginTop: 20, marginHorizontal: -20, paddingHorizontal: 20, borderTopColor: color.off, borderTopWidth: 2, }}>
                <Title>Veja mais</Title>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: color.title,  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                  <MaterialCommunityIcons name="play" size={24} color={color.title} />
                  <Label style={{ marginHorizontal: 10, }}>Assistir</Label>
                </Pressable>
              </Row>}

              {a &&  <ScrollView horizontal>
                <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: color.off, borderRadius: 12, height: 200, }}></Column>
                <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: color.off, borderRadius: 12, height: 200, }}></Column>
                <Column style={{ width: 140, marginVertical: 12,  marginRight: 12, backgroundColor: color.off, borderRadius: 12, height: 200, }}></Column>
              </ScrollView>}

            <Column style={{ marginTop: 10, }}>
                <Title>Anúncio</Title>
                <MotiImage style={{ flexGrow: 1, marginVertical: 12, backgroundColor: color.off, borderRadius: 12, height: 200, width: 200, objectFit: 'cover', alignSelf: 'center' }} source={require('../assets/imgs/ad.png')}/>
              </Column>
            </Column>

          </MotiView>
  
        {a && <MotiView from={{ opacity: 0, translateY: 40,}} animate={{ opacity: 1, translateY: 0,}} transition={{ type: 'timing', duration: 300,}}><Column style={{ padding: 20, }}>
              <Title style={{  marginBottom: 5, }}>Controles</Title>
  
              <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop:20, }}>
  
              <Pressable style={{ width: 52, height: 52, backgroundColor:color.off, justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() => video.current.setPositionAsync(time - 10)} >
                <MaterialCommunityIcons name="rewind" size={24} color={color.title} />
              </Pressable>
              
              <Pressable style={{ width: 52, height: 52, marginHorizontal: 20, backgroundColor:color.off, justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() =>{togglePlay(); setisPlay(!isPlay)}}>
                <AnimatePresence>
                {isPlay ? <FontAwesome6 name="play" size={24} color={color.title} /> : <FontAwesome6 name="pause" size={24} color={color.title} />}
                </AnimatePresence>
              </Pressable>
  
              <Pressable style={{ width: 52, height: 52, backgroundColor: color.off, justifyContent: 'center', borderRadius: 8, alignItems: 'center', }} onPress={() => video.current.setPositionAsync(time + 10)} >
                <MaterialCommunityIcons name="fast-forward" size={24} color={color.title} />
              </Pressable>
            </Row>
            </Column>
          </MotiView>}

          </BottomSheetScrollView>
        </BottomSheet>
     
      </>
  
    );
  }