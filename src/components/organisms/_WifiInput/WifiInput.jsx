import React, { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBle } from '../../../utils/hooks';

const WifiInput = ({ route }) => {
    const { deviceId, deviceName } = route?.params;
    const { connectToDevice } = useBle();
    const [deviceDetail, setDeviceDetail] = useState({ deviceName: '', wifiName: '', wifiPassword: '' });
    const style = StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scroll: {
            gap: 20,
            flexGrow: 1,
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
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
        inputContainer: {
            paddingBottom: 10,
            gap: 15,
        },
        submitButton: {
            width: '80%',
            paddingVertical: 15,
            borderWidth: 3,
            borderRadius: Dimensions.get('window').width,
            borderColor: '#AD8B73',
            backgroundColor: '#E3CAA5',
            alignItems: 'center',
        },
    });

    const handleDeviceNameChange = (text) => {
        setDeviceDetail((prevState) => ({
            ...prevState,
            deviceName: text,
        }));
    };

    const handleWifiNameChange = (text) => {
        setDeviceDetail((prevState) => ({
            ...prevState,
            wifiName: text,
        }));
    };

    const handleWifiPasswordChange = (text) => {
        setDeviceDetail((prevState) => ({
            ...prevState,
            wifiPassword: text,
        }));
    };

    const handleSubmit = () => {
        connectToDevice(deviceId, deviceDetail.wifiName, deviceDetail.wifiPassword);
        setDeviceDetail({ wifiName: '', wifiPassword: '' });
    };

    return (
        <SafeAreaView style={style.screen}>
            <ScrollView contentContainerStyle={style.scroll}>
                <Text style={style.title}>{deviceName}</Text>
                <View style={style.inputContainer}>
                    <Text style={style.text}>Device Name</Text>
                    <TextInput
                        style={style.textInput}
                        onChangeText={handleDeviceNameChange}
                        value={deviceDetail.deviceName}
                    />
                    <Text style={style.text}>Wifi SSID:</Text>
                    <TextInput
                        style={style.textInput}
                        onChangeText={handleWifiNameChange}
                        value={deviceDetail.wifiName}
                    />
                    <Text style={style.text}>Wifi Password:</Text>
                    <TextInput
                        style={style.textInput}
                        onChangeText={handleWifiPasswordChange}
                        value={deviceDetail.wifiPassword}
                    />
                </View>

                <Pressable
                    style={style.submitButton}
                    onPress={handleSubmit}>
                    <Text style={style.text}>Connect and Sumbit</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WifiInput;
