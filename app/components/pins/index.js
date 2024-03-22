import { useContext, useEffect, useState, useRef } from "react"
import { Image,  View, StyleSheet, ScrollView, Pressable } from "react-native"
import { AntDesign, Feather } from "@expo/vector-icons"
import { Row, Title, Column } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { MotiImage, MotiView } from 'moti';
import { addPin, deletePin, verifyPin } from "@hooks/usePin";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";


export function PostsList({ posts, filter }) {

    const { color, font} = useContext(ThemeContext)
    const detailsRef = useRef(null);
    const [select, setSelect] = useState(posts[0]);
    const [selectAspect, setselectAspect] = useState();
    const [selectPin, setselectPin] = useState(false);


    const toggleSelectPin = () => { 
            if(pined){
                deletePin(select).then((res) => {
                    setselectPin(res)
                })
            }else{
                addPin(select).then((res) => {
                    setselectPin(res)
                })
            }
         }

        useEffect(() => {
            verifyPin(select).then((res) => {
                setselectPin(res)
            })
        }, [select])

    const [active, setactive] = useState(false);
    const filteredPosts = filter === 'Tudo' ? posts : posts.filter((post) => post.tag === filter)

    function postsByColumn(column) {
      const rest = column === "left" ? 0 : 1
      return filteredPosts
        .filter((_, index) => index % 2 === rest)
        .map((post) => <Post key={post.id} post={post} active={active}/>)
    }
  
    
    function Post({ post, active }) {
        const [pined, setpined] = useState(false);
        const [aspectRatio, setAspectRatio] = useState(1)
        const [isOpen, setisOpen] = useState(false);
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
        <Pressable onPress={() => router.navigate({pathname: '/(stack)/pins/[item]', params: { it: JSON.stringify(post), }})}  style={{ marginBottom: 12, }}>
            <Image
            source={{ uri: post.image }}
            style={[styles.image, { aspectRatio }]}
            />
            {active ? <></> :
            <Row style={{justifyContent: 'space-between', alignItems: 'center',}}>
                <Title style={{color: color.title, fontSize: 16, letterSpacing: 0, marginTop: 4, fontFamily: font.book,}}>{post.title.slice(0,19)}</Title>
                <Pressable onPress={togglePin} style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center', }}>
                    <AntDesign name={pined ? 'heart' : 'hearto'} size={24} color={color.red} />
                </Pressable>
            </Row>}
        </Pressable>
        )
    }


    return (
        <>
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{gap: 12,}} style={{ paddingBottom: 50, marginHorizontal: 20, }}>
        <Row>
            <MotiView from={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0,}} style={{flex:1, marginBottom: 12, paddingTop: 10, marginRight: 10,}}> 
                {postsByColumn("left")}
            </MotiView>
            <MotiView from={{opacity: 0, translateY: 50}} animate={{opacity: 1, translateY: 0,}} style={{flex:1, marginBottom: 12, paddingTop: 20, marginLeft: 10,}} transition={{delay: 300,}}> 
               <Column style={{ backgroundColor: active ? color.secundary : color.primary, padding: 12, borderRadius: 12, marginBottom: 20, }}>
                    <Pressable onPress={() => {setactive(!active)}} >
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                            <Title style={{ color: active ? color.title : "#fff", }}>Títulos</Title>
                            <Column style={{ width: 70, height: 40, backgroundColor: "#fff",  alignItems: 'center', justifyContent: 'center', borderRadius: 100,  }}>
                                <Column style={{ width: 26, height: 26, backgroundColor: active ? color.secundary : color.primary, borderRadius: 100, alignSelf: active ? 'flex-end' : 'flex-start', marginHorizontal: 8,}}/>
                            </Column>
                        </Row>
                    </Pressable>
               </Column>
               {postsByColumn("right")}
            </MotiView>
        </Row>

      </ScrollView>
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