import React, { useState, useEffect, useContext} from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { listPins } from '../hooks/usePin';
import { FlatList, Image } from 'react-native';
import { ThemeContext } from 'styled-components/native';
export default function PinsSaves() {
    const { color, font } = useContext(ThemeContext)
    const [pins, setpins] = useState();

    useEffect(() => {
        
        listPins().then((res) => {
            console.log(JSON.parse(res));
            setpins(JSON.parse(res))
        })
    }, [])

    const Pin = ({ post }) => {
        const [aspectRatio, setAspectRatio] = useState();
        Image.getSize(post.image, (width, height) => {
            setAspectRatio(width / height)
        })

        return(
            <Column>
                <Image
                source={{ uri: post.image }}
                style={[{borderRadius: 12,}, { aspectRatio }]}
                />
                <Row style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,}}>
                    <Title style={{color: color.title, fontSize: 24, letterSpacing: 0, marginTop: 8,}}>{post.title}{post.id}</Title>
                </Row>
        </Column>
        )
        }

    return (
        <Main>
            <Scroll>
                <Column>
                    <Title style={{ fontSize: 32, marginTop: 30, marginBottom: 20, marginHorizontal: 20,}}>Pins Salvos</Title>
                    <FlatList
                        data={pins?.reverse()}
                        style={{ marginHorizontal: 20, }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Pin post={item} />
                        )}
                    />
                </Column>
            </Scroll>
        </Main>
    )
}