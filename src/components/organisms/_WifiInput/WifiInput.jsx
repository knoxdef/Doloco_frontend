import React, { useState } from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const WifiInput = ({ route }) => {
    const { deviceId, deviceName } = route?.params;
    const [wifiDetail, setWifiDetail] = useState({ wifiName: "", wifiPassword: "" });
    console.log("Wifi Detail", wifiDetail);
    const style = StyleSheet.create({
        screen: {
            gap: 20,
            height: '100%',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
        },
        text: {
            color: 'black',
        },
        textInput: {
            borderBottomWidth: 1,
            width: Dimensions.get('window').width * 0.7,
            color: 'black',
        },
        scanResultItem: {
            width: '80%',
            paddingVertical: 15,
            borderWidth: 3,
            borderRadius: Dimensions.get('window').width,
            borderColor: '#AD8B73',
            backgroundColor: '#E3CAA5',
            alignItems: 'center',
        },
    });

    const handleWifiNameChange = (text) => {
        setWifiDetail((prevState) => ({
            ...prevState,
            wifiName: text,
        }));
    };

    const handleWifiPasswordChange = (text) => {
        setWifiDetail((prevState) => ({
            ...prevState,
            wifiPassword: text,
        }));
    };

    return (
        <View style={style.screen}>
            <Text style={style.title}>{deviceName}</Text>
            <View style={{ paddingBottom: 10, gap: 15 }}>
                <Text style={style.text}>Wifi SSID:</Text>
                <TextInput
                    style={style.textInput}
                    onChangeText={handleWifiNameChange}
                    value={wifiDetail.wifiName}
                />
                <Text style={style.text}>Wifi Password:</Text>
                <TextInput
                    style={style.textInput}
                    onChangeText={handleWifiPasswordChange}
                    value={wifiDetail.wifiPassword}
                />
            </View>

            <Pressable
                style={style.scanResultItem}
                onPress={() => {
                    setWifiDetail({ wifiName: '', wifiPassword: '' });
                    Alert.alert("Pressed Connect " + deviceId);
                }}>
                <Text style={style.text}>Connect and Sumbit</Text>
            </Pressable>
        </View>
    );
};

export default WifiInput;
