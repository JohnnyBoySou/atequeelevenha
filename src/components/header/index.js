import React, { useEffect, useState, memo, useContext } from 'react';
import { Image, Pressable, Dimensions } from 'react-native';
import { Column, Label, Row, Title } from '../../theme/global'
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatePresence, MotiImage, MotiView, MotiText, useAnimationState } from 'moti';
import { FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getPreferences } from '../../api/user/preferences';
const { height, width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

function Header() {
    const {color, font } = useContext(ThemeContext);
    const [user, setUser] = useState();
    const navigation = useNavigation();
    const hello = new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite';
    const [toggleIsOpen, setToggleIsOpen] = useState(false);
    const left = width / 2 - 100;
    const toggleAnimation = useAnimationState({
        close: {
            height: 160,
        },
        open: {
            height: 450,
        },
    });
    const toggleImage = useAnimationState({
        close: {
            height: 64,
            width: 64,
            translateY: -20,
            translateX: 0,
        },
        open: {
            height: 170,
            width: 170,
            translateY: 0,
            translateX: left,
        },
    });
    const toggleText = useAnimationState({
        close: {
            fontSize: 24,
            translateY: -140,
        },
        open: {
            translateY: 30,
        },
    });
    const toggleTitle = useAnimationState({
        close: {
            fontSize: 28,
            translateX: -46,
            translateY: -80,
        },
        open: {
            fontSize: 46,
            translateX: 0,
            translateY: 10,
        
        },
    });
    const handleOpenToggle = () => {
      toggleAnimation.transitionTo('open');
      toggleImage.transitionTo('open');
      toggleText.transitionTo('open');
      toggleTitle.transitionTo('open');
      setToggleIsOpen(true)
    }
    const handleCloseToggle = () => {
        toggleAnimation.transitionTo('close');
        toggleImage.transitionTo('close');
        toggleText.transitionTo('close');
        toggleTitle.transitionTo('close');
        setToggleIsOpen(false)
    }
    useEffect(() => {
        getPreferences().then(res => setUser(res))
        toggleAnimation.transitionTo('open')
        toggleImage.transitionTo('open')
        toggleText.transitionTo('open')
        toggleTitle.transitionTo('open')
        setToggleIsOpen(true)
    }, [])  

    return(
        <Column>
            <Pressable onPress={() => navigation.navigate('Novidades')}  style={{width: 52, height: 52, top: 40, borderRadius: 100, backgroundColor: "#ffffff30", zIndex: 99, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', }}>
                <MaterialCommunityIcons name="bell-badge-outline" size={24} color="#fff" />
            </Pressable>
            <MotiView state={toggleAnimation} transition={{type: 'timing', duration: 300,}}>
                <MotiImage blurRadius={40} source={{ uri: user?.capa }} style={{ width: 0.99 * width, height: '100%', opacity: 0.6, top: -100, left: -15, borderRadius: 32, right: 10, zIndex: -2, position: 'absolute', }} />
                <Pressable onPress={() => navigation.navigate('Account')} >
                    <MotiImage state={toggleImage} source={{ uri: user?.avatar }} style={{ width: 170, height: 170, borderRadius: 100,}} resizeMode='cover' transition={{ type: 'timing', duration: 300,  }}/>
                </Pressable>
                <MotiText state={toggleTitle} transition={{ type: 'timing', duration: 300,  }} style={{ fontSize: 46, textAlign: toggleIsOpen ? 'center' : 'left', fontFamily: toggleIsOpen ? font.bold : font.book, color: "#fff", alignSelf: 'center',}}>{hello},{"\n"}{user?.name}</MotiText>

                {toggleIsOpen && <MotiView from={{scale: 0.5, opacity: 0.4}} animate={{scale: 1, opacity: 1,}} transition={{type: 'timing', duration: 300,}} style={{padding: 12, zIndex: 99, marginTop: -150,}}>

                    <Pressable style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: '#ffa6a1', justifyContent: 'center', alignItems: 'center',  marginLeft: 0, marginTop: 20,}}>
                        <MaterialCommunityIcons name="cards" size={24} color="#000" />
                    </Pressable>
                    <Pressable style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: '#ffe3a1', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginRight: 10 }}>
                        <Ionicons name="albums" size={24} color="#000" />
                    </Pressable>
                    <Pressable style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: '#a1ffc0', justifyContent: 'center', alignItems: 'center', marginLeft: 20,}}>
                        <FontAwesome5 name="history" size={24} color="#000" />
                    </Pressable>
                    <Pressable style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: '#a1d7ff', justifyContent: 'center', marginTop: -30, alignItems: 'center',  alignSelf: 'flex-end', marginRight: 50 }}>
                        <Fontisto name="player-settings" size={24} color="#000" />
                    </Pressable>
                
                </MotiView>}
            </MotiView>



            <Pressable  onPress={toggleIsOpen ? handleCloseToggle : handleOpenToggle} style={{width: 42, height: 42, marginTop: -90,  zIndex: 99, backgroundColor: "#262626", borderRadius: 100, alignSelf: 'center', zIndex: 999, justifyContent: 'center', alignItems: 'center',  }}>
                <MaterialCommunityIcons name={toggleIsOpen ? "chevron-up" : "chevron-down"} size={36} color="#fff"/>
            </Pressable>
        </Column>
    )
}

export default memo(Header);

/**
 * 
                        <LinearGradient colors={['#ED274A', '#FF620A', '#E0CA3C']} style={{ width: 200, height: 200, position: 'absolute',  alignSelf: 'center', borderRadius: 100, }} />
            
            <AnimatePresence>
                <MotiView state={toggleAnimation} transition={{type: 'timing'}} style={{ width: '100%', height: 10, backgroundColor: '#262626', borderRadius: 12,  marginTop: 20, height: 0,}}>
                    <Column style={{padding: 12,}}>
                        <Title>Ações</Title>
                        <Row style={{marginTop: 12, justifyContent: 'space-between'}}>
                            <Pressable style={{flexDirection:'column', padding: 12, flexGrow: 1,  marginHorizontal: 6, borderRadius: 8, backgroundColor: "#404040", justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialCommunityIcons name="shopping-outline" size={24} color="#fff" />
                                <Label>Lojinha</Label>
                            </Pressable>
                            <Pressable style={{flexDirection:'column', padding: 12,flexGrow: 1, borderRadius: 8, marginHorizontal: 6, backgroundColor: "#404040", justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialCommunityIcons name="account-outline" size={24} color="#fff" />
                                <Label>Conta</Label>
                            </Pressable>
                            <Pressable style={{flexDirection:'column', padding: 12, flexGrow: 1, borderRadius: 8, marginHorizontal: 6, backgroundColor: "#404040", justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
                                <Label>Config</Label>
                            </Pressable>
                            <Pressable style={{flexDirection:'column', padding: 12, flexGrow: 1, marginHorizontal: 6, borderRadius: 8, backgroundColor: "#404040", justifyContent: 'center', alignItems: 'center', }}>
                                <MaterialCommunityIcons name="cards-outline" size={24} color="#fff" />
                                <Label>Cards</Label>
                            </Pressable>
                        </Row>
                    </Column>
                </MotiView>
            </AnimatePresence>
 */