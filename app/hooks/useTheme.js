import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useTheme = () => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                setTheme(storedTheme);
            } catch (error) {
                console.error('Error fetching theme:', error);
            }
        };

        fetchTheme();
    }, []);

    return theme;
};

const toggleTheme = () => {
    const [theme, setTheme] = useState(null);

    const usetoggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                setTheme(storedTheme);
            } catch (error) {
                console.error('Error fetching theme:', error);
            }
        };

        fetchTheme();
    }, []);

    return [theme, usetoggleTheme];
};


const changeTheme = async () => { 
    const storedTheme = await AsyncStorage.getItem('theme');
    const tm = storedTheme === 'light' ? 'dark' : 'light';
    await AsyncStorage.setItem('theme', tm);
    return tm;           
 }


export { toggleTheme, useTheme, changeTheme };