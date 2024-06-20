import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
    const saveData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            console.log(`Data saved with key ${key}`);
        } catch (e) {
            console.log("Error Save Data:", e);
        }
    };

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.log("Error Get Data:", e);
        }
    };

    const addToExisting = async (key, value, saveType) => {
        try {
            const existingData = await getData(key);
            let updatedData;

            console.log("Existing data", existingData);

            if (Array.isArray(existingData)) {
                // If existing data is an array, add new data to the array
                updatedData = [...existingData, ...value];
            } else if (typeof existingData === 'object' && existingData !== null) {
                // If existing data is an object, merge new data into the object
                updatedData = { ...existingData, ...value };
            } else {
                // If no existing data, initialize as an array with the new data
                if (saveType === Array) {
                    updatedData = [value];
                } else {
                    updatedData = value;
                }
            }

            await saveData(key, updatedData);
            console.log('Data added successfully');
        } catch (error) {
            console.log("Error Add to Existing:", error);
        }
    };

    return {
        saveData,
        getData,
        addToExisting,
    };
}

export default useAsyncStorage;
