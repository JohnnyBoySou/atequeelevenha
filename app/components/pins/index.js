import { useContext, useEffect, useState, useRef } from "react"
import { Image,  FlatList, StyleSheet, ScrollView, Pressable } from "react-native"
import { AntDesign, Feather } from "@expo/vector-icons"
import { Row, Title, Column, Spacer } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView } from 'moti';
import { addPin, deletePin, verifyPin } from "@hooks/usePin"; 
import { router } from "expo-router";
import Animated from "react-native-reanimated"; 


export function PostsList({ posts, filter = 'Papel de Parede' }) {

    const { color, font} = useContext(ThemeContext)
    const filteredPosts = filter === 'Tudo' ? posts : posts.filter((post) => post.tag === filter)
    
    function Post({ post, active, index }) {
        const [pined, setpined] = useState(false);
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
                    setpined(res)
                })
            }else{
                addPin(post).then((res) => {
                    setpined(res)
                })
            }
         }

       


    return (
        <Pressable onPress={() => router.push({pathname: '/(stack)/pins/[item]', params: { it: JSON.stringify(post), index: index, }})}  style={{ marginBottom: 12, flexGrow: 1,}}>
            <Animated.Image sharedTransitionTag={post.id.toString()}
            source={{ uri: post.image }}
            style={[styles.image, { aspectRatio }]}
            />

            {active ? <></> :
                <Pressable onPress={togglePin} style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', }}>
                    <AntDesign name={pined ? 'heart' : 'hearto'} size={24} color={color.red} />
                </Pressable>
            }
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