import { useContext, useEffect, useState, useRef } from "react"
import { Image,  FlatList, StyleSheet, ScrollView, Pressable } from "react-native"
import { AntDesign, Feather } from "@expo/vector-icons"
import { Row, Title, Column, Spacer } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { AnimatePresence, MotiImage, MotiView } from 'moti';
import { addPin, deletePin, verifyPin } from "@hooks/usePin"; 
import { router } from "expo-router";
import Animated from "react-native-reanimated"; 


export function PostsList({ posts, filter = 'Papel de Parede' }) {

    const { color, font} = useContext(ThemeContext)
    const filteredPosts = filter === 'Tudo' ? posts : posts.filter((post) => post.tag === filter)
    
    function Post({ post, active, index }) {
        const [pined, setpined] = useState(false);
        const { color, font} = useContext(ThemeContext)
        const [aspectRatio, setAspectRatio] = useState(1)
        useEffect(() => {
            if (post?.image) {
                Image.getSize(post.image, (width, height) => {
                setAspectRatio(width / height)
                })
            }
            verifyPin(post).then((res) => {
                setpined(res)
            })
        }, [])

        const togglePin = () => { 
            if(pined){
                deletePin(post).then((res) => {
                    setpined(false)
                })
            }else{
                addPin(post).then((res) => {
                    setpined(true)
                })
            }
         }

       


    return (
        <Pressable onLongPress={togglePin} onPress={() => router.push({pathname: '/(stack)/pins/[item]', params: { it: JSON.stringify(post), index: index, }})}  style={{ marginBottom: 12, flexGrow: 1, backgroundColor: color.red+50, borderRadius: 18,}}>
            <Animated.Image 
            source={{ uri: post.image }}
            style={[styles.image, { aspectRatio }, { transform: [{ scaleX: pined ? 0.95 : 1}, { scaleY: pined ? 0.98 : 1}], }]}
            />
            <AnimatePresence style={{ justifyContent: 'center', alignItems: 'center',  }}>
            {pined ? 
                <MotiView from={{opacity: 0, scale: 0.6, }} animate={{opacity: 1, scale: 1.2}} exit={{opacity: 0, scale: 0.5}} transition={{duration: 600, }} style={{ position: 'absolute', top: 30, alignSelf: 'center', }}> 
                    <AntDesign name='heart' size={24} color={color.red} />
                </MotiView> : 
                <MotiView from={{opacity: 0, scale: 0.6, }}  animate={{opacity: 0, scale: 0.5}} transition={{duration: 600, }} style={{ position: 'absolute', top: 30, alignSelf: 'center', }}> 
                    <AntDesign name='hearto' size={24} color={color.red} />
                </MotiView>
                }
            </AnimatePresence>
            
        </Pressable>
        )
    }


    const itens1 = filteredPosts.filter((_, index) => index % 2 === 0)
    const itens2 = filteredPosts.filter((_, index) => index % 2 === 1)

    return (
        <>
        <Row style={{ marginHorizontal: 12, }}>
            <FlatList
                data={itens1}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <Post post={item} index={index}/>}
                />
                <Spacer/>
            <FlatList
                data={itens2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => <Post post={item}  index={index}/>}
                />
            </Row>
      </>

    )
  }


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    image: {
      borderRadius: 18,
      backgroundColor: "#f1f1f1",
    },
    title: {
      fontSize: 14,
      color:  '#fff',
      fontFamily: 'Font_Medium'
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 7,
    },
  })