import React, { useContext, useRef, useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, Dimensions, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Main, Label, Title, Row, Column } from '@theme/global';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AntDesign, FontAwesome6, MaterialCommunityIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from 'expo-av';
import { AnimatePresence, MotiImage, MotiView } from "moti";
import { ThemeContext } from 'styled-components/native';

import { getShortsRecents } from "@api/shorts";
import { addShort, deleteShort, verifyShort } from './../../hooks/useShorts';

const { width, height } = Dimensions.get('window');

export default function Reels() {
    
    const [type, settype] = useState('Feed');
    const [showType, setshowType] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [current, setcurrent] = useState();
    const { color, font } = useContext(ThemeContext);
    const onRefresh = () => {
        setRefreshing(true);
    };

    const [feed, setfeed] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          setloading(true)
          getShortsRecents().then((res) => {  setfeed(res);  setloading(false)}  );
        }
        fetchData()
    }, [])  

    const onViewableItemsChanged = ({ viewableItems }) => {  setcurrent(viewableItems[0].item.id); };
    const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

    const Loading = () => {
        return(
            <Column style={{ justifyContent: 'center', alignItems: 'center', height: 0.85 * height, }} >
                <ActivityIndicator size="large" color={color.primary} />
            </Column>
        )}

return (
    <Main >
            <Row style={{ alignItems: 'center', paddingTop: 15, paddingLeft: 20, paddingBottom: 16, borderRadius: 24,  }}>
                <Pressable onPress={() => setshowType(!showType)} style={{ marginRight: 16, }}>
                    <Title style={{  fontSize: 24, fontFamily: 'Font_Bold'}}>Shorts</Title>
                </Pressable>
                <AnimatePresence>

                {showType &&  
                <Row style={{ marginVertical: -6, }}>
                    <MotiView from={{opacity: 0, transform: [{rotate: '42deg',}, {scale:0.5,}] }} animate={{ opacity: 1, transform: [{rotate: '0deg',}, { scale: 1,}]}} transition={{delay: 100,}} exit={{opacity: 0, transform: [{rotate: '-40deg',},{ scale: .6,} ]}}>
                        <Pressable  style={{ paddingVertical: 8, paddingHorizontal: 8, borderRadius: 100, backgroundColor: color.primary+30, justifyContent: 'center', alignItems: 'center', marginRight: 10, }} onPress={() => {setshowType(!showType); }} >
                        <AntDesign name="close" size={18} color={color.primary} />
                        </Pressable>
                    </MotiView>
                    <MotiView from={{opacity: 0, transform: [{translateY: 30,}] }} animate={{ opacity: 1, transform: [{translateY: 0,}]}} exit={{opacity: 0, transform: [{translateY: 20,}]}} transition={{delay: 200,}}>
                        <Pressable  style={{ paddingVertical: 8, paddingHorizontal: 18, borderRadius: 100, backgroundColor: type === 'Feed' ? color.primary : color.primary+30, justifyContent: 'center', alignItems: 'center',  }} onPress={() => {settype('Feed'); }} >
                            <Title style={{ fontSize: 18, color: type === 'Feed' ? "#fff" : color.primary, }}>Para você</Title>
                        </Pressable>
                    </MotiView>
                    <MotiView from={{opacity: 0, transform: [{translateY: 30,}] }} animate={{ opacity: 1, transform: [{translateY: 0,}]}} transition={{delay: 300,}} exit={{opacity: 0, transform: [{translateY: 20,}]}}>
                        <Pressable style={{ paddingVertical: 8, marginLeft: 10, paddingHorizontal: 18, borderRadius: 100, backgroundColor: type === 'New' ? color.primary : color.primary+30, justifyContent: 'center', alignItems: 'center',  }} onPress={() => {settype('New'); }}>
                            <Title style={{ fontSize: 18, color: type === 'New' ? "#fff" : color.primary, }}>Recentes</Title>
                        </Pressable>
                    </MotiView>
                </Row>
                }

                </AnimatePresence>

            <AnimatePresence>
            {!showType &&  
                <Row style={{ position: 'absolute', right: 20, }} >
                  <MotiView style={{ width: 32, height: 32, backgroundColor: '#E26D5E', borderRadius: 2, }} from={{transform: [{translateY: 20,}, { rotate: '24deg'}], opacity: 0,}} animate={{transform: [{translateY: 0,}, { rotate: '0deg'}], opacity: 1,}} exit={{transform: [{translateY: 50,}, { rotate: '40deg'}]}} transition={{ delay: 100,}}/>
                  <MotiView style={{ width: 42, height: 32, backgroundColor: '#00C6AE', marginLeft: -12, marginRight: -20, borderRadius: 10, }} from={{transform: [{translateY: 20,}], opacity: 0,}} animate={{transform: [{translateY: 0,}], opacity: 1,}} exit={{transform: [{translateY: 50,}]}} transition={{ delay: 300,}}/>
                  <MotiView style={{ width: 32, height: 32, backgroundColor: '#FFC79E', borderRadius: 100, }} from={{transform: [{translateY: 20,}], opacity: 0,}} animate={{transform: [{translateY: 0,}], opacity: 1,}} exit={{transform: [{translateY: 50,}]}} transition={{ delay: 600,}}/>
                </Row>}
            </AnimatePresence>
            </Row>

            <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false} decelerationRate="fast" refreshControl={<RefreshControl colors={['#E26D5E', '#00C6AE', '#FFC79E' ]} refreshing={false} onRefresh={onRefresh} />}>
                <FlatList
                    data={type === 'Feed' ? feed : feed.reverse()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, current }) => <ShortList item={item} current={current} />}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<Loading />}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                />

            </ScrollView>
    </Main>
);
}




export function ShortList({ item, current,  }) {
    const { color, font, theme } = useContext(ThemeContext);
    const aboutModal = useRef(null);
    const video = useRef(null);
    const [like, setLike] = useState(false);
    const [isPlay, setisPlay] = useState(true);
    const [time, settime] = useState(0);

    const togglePlay = () => { if(!item.id == current){return} if (isPlay) { video.current.pauseAsync(); setisPlay(false)} else {video.current.playAsync(); setisPlay(true)}}
   
    useEffect(() => {
        if(item.id != current){
            video.current.pauseAsync();
        }else{
            video.current.playAsync();
        }
    }, [current])


    useEffect(() => {
        const getData = async () => {
            verifyShort(item).then((res) => {
                setLike(res)
            })
        }
        getData()
    }, [])

    const toggleLike = () => { 
        if(like){
            deleteShort(item).then((res) => {
                setLike(false)
            })
        }else{
            addShort(item).then((res) => {
                setLike(true)
            })
        }
    }


    const a = false
    return (
      <>
        <Column style={{ width: time+'%', height: 5, position: 'absolute', bottom: 0, borderRadius: 100, backgroundColor: "#fff", zIndex: 99, left: 6, right: 6,  }}/>
        
        <Video
            ref={video}
            style={{  width: width, height: 0.8639 * height,  backgroundColor: '#404040', }}
            source={{ uri: item?.video }}
            resizeMode={ResizeMode.COVER}
            isLooping
            //onLoad={() => {togglePlay(); setisPlay(!isPlay); }}
            onPlaybackStatusUpdate={e => settime((e.positionMillis / e.durationMillis * 100).toFixed(0)) }
            progressUpdateIntervalMillis={50}
          />

        <Pressable style={{ width: width, height: height, backgroundColor: "#30303000", position: 'absolute', top: -40, justifyContent: 'center', alignItems: 'center', }} onPress={() =>{togglePlay(); setisPlay(!isPlay)}}>
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

        <Column style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, right: 14,  }}>
            <AnimatePresence>
                <Pressable onPress={toggleLike} style={{ width: 52, height: 52, borderRadius: 100, opacity: like ? 1 : 0.7, backgroundColor: like ? "#FF5833" : color.off, justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                {like ? 
                <MotiView from={{scale: 0.8, opacity: .6, }} animate={{scale: 1.3, opacity: 1,}}  transition={{ duration: 500,}}>
                    <AntDesign name="heart" size={22} color="#fff" /> 
                </MotiView>
                : 
                <MotiView from={{scale: 1.3, opacity: 1, }} animate={{scale: 0.9, opacity: 1, }}  transition={{ duration: 500,}}>
                    <AntDesign name="hearto" size={22} color={color.title} />
                </MotiView>
                }
                </Pressable>
            </AnimatePresence>
            <Pressable   style={{ width: 52, height: 52, borderRadius: 100, opacity: like ? 1 : 0.7,  backgroundColor: color.off, justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="share-social-outline" size={24} color={color.title} />
            </Pressable>
        </Column>
  
      </>
  
    );
  }

  /**
   * 
        <BottomSheet ref={aboutModal} snapPoints={[0.5, 350, '80%']} backgroundStyle={{backgroundColor: color.background, }} handleIndicatorStyle={{backgroundColor: "#d7d7d760"}}>
          <BottomSheetScrollView>
  
            <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: 20, paddingBottom: 20, marginTop: 0, borderBottomColor: color.off, borderBottomWidth: 2,}}>
              <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
  
                <Pressable  style={{ backgroundColor: color.title,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8,}}>
                  <Label style={{ color: theme == 'dark' ? "#000" : "#fff" }}>Sobre</Label>
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
   */