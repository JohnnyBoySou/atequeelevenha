import React, { useState, useEffect, useContext } from 'react';
import { Pressable } from 'react-native';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
export default function EditorPage() {
    const [type, setType] = useState('Salvos');
    
    const { color, font,  } = useContext(ThemeContext)
    return (
        <Main>
            <Scroll>
                <Column>
                <Title>Editor de Imagens</Title>

                        <Row style={{ marginBottom: 0, backgroundColor: color.background, padding: 12,  zIndex: 99, }}>
                            <Pressable onPress={() => { setType('Salvos') }} style={{ paddingVertical: 10, paddingHorizontal: 16, marginLeft: 10, backgroundColor: type === 'Salvos' ? color.primary : color.off, borderRadius: 100, zIndex: 99,}}>
                                <Label style={{ color:  type === 'Salvos' ? color.off : color.primary, fontFamily: type === 'Salvos' ? font.bold : font.book, }}>Salvos</Label>
                            </Pressable>
                            <Pressable onPress={() => { setType('Curtidos') }} style={{ paddingVertical: 10, marginHorizontal: 8, paddingHorizontal: 16, backgroundColor: type === 'Curtidos' ? color.primary : color.off, borderRadius: 100, zIndex: 99, }}>
                                <Label style={{ color: type === 'Curtidos' ? color.off : color.primary, fontFamily: type === 'Curtidos' ? font.bold : font.book, }}>Curtidos</Label>
                            </Pressable>
                        
                        </Row>

                    {/*Bottom Bar */}
                    <Row>


                    </Row>
                </Column>
            </Scroll>
        </Main>
    )
}