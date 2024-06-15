import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({value, setValue, placeholder, secureTextEntry, keyboardType, multiline}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChange={setValue}
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',

        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {

    },
})

export default CustomInput