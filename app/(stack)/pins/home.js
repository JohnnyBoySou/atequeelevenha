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

    useEffect(() => {
        getPins().then((data) => {
            setPOSTS(data);
        });
    }, [])
    return (
        <Main>
            <Scroll stickyHeaderIndices={[1]}>
                <Row style={{ paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center',   marginBottom: 20,  }}>

                    <Row style={{ alignItems: 'center', }}>
                        <Pressable onPress={() => {router.back()}} >
                            <AntDesign name="arrowleft" size={24} color={color.title} />
                        </Pressable>
                        <Title style={{ fontSize: 42, zIndex: 99, marginLeft: 12,}}>Pins</Title>
                    </Row>
                    <Pressable onPress={() => {router.navigate('/pins_save')}} >
                            <AntDesign name="heart" size={24} color={color.title} />
                        </Pressable>
                </Row>


                <Filters filters={FILTERS} filter={filter} onChange={setFilter} />
                <PostsList posts={POSTS} filter={filter} />
            </Scroll>
        </Main>
    )
}

///<Posts posts={POSTS} />