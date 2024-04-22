import AsyncStorage from '@react-native-async-storage/async-storage';

export const addPin = async (newPin) => {
    try {
        const savedPin = await AsyncStorage.getItem('@pin_saves');
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinExists = pins.some(pin => pin.id === newPin.id);
        if (!pinExists) {
            pins.push(newPin);
            await AsyncStorage.setItem('@pin_saves', JSON.stringify(pins));
            return true;
        } else {
            console.log('Pin already exists');
            return false;
        }
    } catch (error) {
        console.log('Error adding pin:', error);
        return false;
    }
};


export const deletePin = async (pinToDelete) => {
    try {
        const savedPin = await AsyncStorage.getItem('@pin_saves');
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinIndex = pins.findIndex(pin => pin.id === pinToDelete.id);
        if (pinIndex !== -1) {
            pins.splice(pinIndex, 1);
            await AsyncStorage.setItem('@pin_saves', JSON.stringify(pins));
            return true;
        } else {
            console.log('Pin does not exist');
            return false;
        }
    } catch (error) {
        console.log('Error deleting pin:', error);
        return false;
    }
};

export const verifyPin = async (pinToVerify) => {
    try {
        const savedPin = await AsyncStorage.getItem('@pin_saves');
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinExists = pins.some(pin => pin.id === pinToVerify.id);
        return pinExists;
    } catch (error) {
        console.log('Error verifying pin:', error);
        return false;
    }
};


export const listPins = async () => {
    try {
        const savedPin = await AsyncStorage.getItem('@pin_saves');
        const res = savedPin ? JSON.parse(savedPin) : [];
        return res
    } catch (error) {
        console.log('Error listing pins:', error);
        return [];
    }
};