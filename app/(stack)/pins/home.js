import React, { useState, useContext, useEffect } from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';

import { FILTERS, getPins } from '@api/pins';
import { Filters } from '@components/filters';
import { PostsList } from '@components/pins';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { router } from 'expo-router';

export default function Pins() {
    const [filter, setFilter] = useState(FILTERS[0])
    const { color } = useContext(ThemeContext)
    const [POSTS, setPOSTS] = useState([]);
    const [category, setcategory] = useState(true);

    useEffect(() => {
        getPins().then((data) => {
            setPOSTS(data);
        });
    }, [])
    return (
        <Main>
            <Scroll stickyHeaderIndices={[0]}>


                <Column style={{ backgroundColor: color.background, }}>
                <Row style={{ paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center',   marginBottom: 20,  }}>
                    <Row style={{ alignItems: 'center', }}>
                        <Pressable onPress={() => {router.back()}} >
                            <AntDesign name="arrowleft" size={24} color={color.title} />
                        </Pressable>
                        <Title style={{ fontSize: 42, zIndex: 99, marginLeft: 12,}}>Pins</Title>
                    </Row>
                    <Pressable onPress={() => {router.navigate('pins/save')}} >
                            <AntDesign name="heart" size={24} color={color.title} />
                        </Pressable>
                </Row>
                
                <Filters filters={FILTERS} filter={filter} onChange={setFilter} />
                </Column>
               
               
               
               
               
                {category && <Column>
                  <PostsList posts={POSTS} filter={filter} />
                </Column>}

                {!category && 
                    <Pressable >
                        <Row style={{ justifyContent: 'center', alignItems: 'flex-end',  marginTop: 50,}}>
                            <Pressable style={{ width: 120, height: 120, borderRadius: 500, marginHorizontal: 12, marginBottom: -40, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>Popular</Title></Pressable>
                        </Row>
                        <Row style={{ justifyContent: 'center', alignItems: 'flex-end', marginBottom: 12,  }}>
                            <Pressable style={{ width: 140, height: 140, borderRadius: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[5]}</Title></Pressable>
                            <Pressable style={{ width: 80, height: 80, borderRadius: 500, marginHorizontal: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[1]}</Title></Pressable>
                            <Pressable style={{ width: 140, height: 140, borderRadius: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[2]}</Title></Pressable>
                        </Row>
                        <Row>
                            <Pressable style={{ width: 90, height: 90, borderRadius: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[0]}</Title></Pressable>
                            <Pressable style={{ width: 150, height: 150, borderRadius: 500, marginHorizontal: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[4]}</Title></Pressable>
                            <Pressable style={{ width: 120, height: 120, borderRadius: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: color.secundary, }}><Title>{FILTERS[3]}</Title></Pressable>
                        </Row>
                    
                    </Pressable>
                }
            </Scroll>
        </Main>
    )
}

///<Posts posts={POSTS} />