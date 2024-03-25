import AsyncStorage from '@react-native-async-storage/async-storage';

const keyValue = '@shorts_saves';

export const addShort = async (newPin) => {
    try {
        const savedPin = await AsyncStorage.getItem(keyValue);
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinExists = pins.some(pin => pin.id === newPin.id);
        if (!pinExists) {
            pins.push(newPin);
            await AsyncStorage.setItem(keyValue, JSON.stringify(pins));
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


export const deleteShort = async (pinToDelete) => {
    try {
        const savedPin = await AsyncStorage.getItem(keyValue);
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinIndex = pins.findIndex(pin => pin.id === pinToDelete.id);
        if (pinIndex !== -1) {
            pins.splice(pinIndex, 1);
            await AsyncStorage.setItem(keyValue, JSON.stringify(pins));
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

export const verifyShort = async (pinToVerify) => {
    try {
        const savedPin = await AsyncStorage.getItem(keyValue);
        const pins = savedPin ? JSON.parse(savedPin) : [];
        const pinExists = pins.some(pin => pin.id === pinToVerify.id);
        return pinExists;
    } catch (error) {
        console.log('Error verifying pin:', error);
        return false;
    }
};


export const listShorts = async () => {
    try {
        const savedPin = await AsyncStorage.getItem(keyValue);
        return savedPin ? [savedPin] : [];
    } catch (error) {
        console.log('Error listing pins:', error);
        return [];
    }
};