import React, { useState, useEffect, useContext, useRef} from 'react';
import { Column, Row, Main, Scroll, Title, Label, } from '@theme/global';
import { listPins } from '@hooks/usePin';
import { Dimensions, Image } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

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
        </Column>
        )
        }

        const [index, setIndex] = useState(0);
        const isCarousel = useRef(null);
    return (
        <Main>
            <Image blurRadius={10} source={{ uri: 'https://i.pinimg.com/564x/32/81/96/328196428eea8994bc9e3d527de88e2f.jpg' }} style={{ width: '100%', height: '110%', position: 'absolute', top: 0, left: 0, paddingVertical: 40, zIndex: -2,}} />
            <Scroll>
                <Column>
                    <Title style={{ fontSize: 32, marginTop: 30, marginBottom: 20, marginHorizontal: 20,}}>Pins Salvos</Title>
          
                    <Carousel
                        ref={isCarousel}
                     style={{ marginTop: 20, marginHorizontal: 20,}}
                        sliderWidth={width}
                        itemWidth={300}
                        data={pins?.reverse()}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (  <Pin post={item} /> )}
                        layout={'tinder'} 
                        layoutCardOffset={9}
                       // onSnapToItem={index => setIndex(index)}
                    />

               
                </Column>
            </Scroll>
        </Main>
    )
}

/**
 *  <Pagination
                            dotsLength={pins?.length}
                            activeDotIndex={index}
                            carouselRef={isCarousel}
                            tappableDots={true}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 8,
                                backgroundColor: 'red',
                            }}
                            inactiveDotStyle={{
                                backgroundColor: 'white',
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 8,
                            }}
                            inactiveDotOpacity={0.9}
                            inactiveDotScale={0.6}
                            />
 */