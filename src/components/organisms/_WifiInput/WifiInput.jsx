import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useManager from '../../../utils/hooks/useManager';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useAxios } from '../../../utils/hooks/useAxios';
import AwesomeAlert from 'react-native-awesome-alerts';

const WifiInput = ({ route, navigation }) => {
    const [deviceDetail, setDeviceDetail] = useState({ deviceName: '', wifiName: '', wifiPassword: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { deviceName, deviceId, configured } = route?.params;
    const { sendMessage, disconnectBle } = useManager();
    const { getData } = useAsyncStorage();
    const { postRequest } = useAxios();

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

    const handleSubmit = async () => {
        try {
            if (!configured) {
                await sendMessage(deviceId, deviceDetail.wifiName, deviceDetail.wifiPassword);
            }
            await disconnectBle(deviceId);

            const user = await getData('user');
            await postRequest('storeAccess', { serial: deviceName, email: user.email });

            setDeviceDetail({ wifiName: '', wifiPassword: '' });

            setShowAlert(true);
            setAlertTitle('Success');
            setAlertMessage('Wifi setup complete, return to home while we change your smart door wifi credential.');
        } catch (error) {
            setShowAlert(true);
            setAlertTitle('Error');
            setAlertMessage('Wifi Setup Failed, something went wrong.');
        }
    };

    return (
        <SafeAreaView style={style.screen}>
            <AwesomeAlert
                show={showAlert}
                title={alertTitle}
                titleStyle={{
                    color: alertTitle === 'Success' ? 'green' : alertTitle === 'Error' ? 'red' : 'orange',
                    fontSize: 30,
                    fontWeight: 'bold',
                }}
                message={alertMessage}
                showConfirmButton={alertTitle === 'Success'}
                showCancelButton={alertTitle === 'Warning' || alertTitle === 'Error'}
                confirmButtonColor={'green'}
                cancelButtonColor={alertTitle === 'Error' ? 'red' : 'orange'}
                confirmText={'Return to home'}
                cancelText={'Close'}
                onConfirmPressed={async () => {
                    setShowAlert(false);
                    navigation.navigate('Home');
                }}
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                closeOnTouchOutside={false}
            />

            <ScrollView contentContainerStyle={style.scroll}>
                <Text style={style.title}>{deviceName}</Text>
                <View style={style.inputContainer}>
                    <Text style={style.text}>Device Name</Text>
                    <TextInput
                        style={style.textInput}
                        onChangeText={handleDeviceNameChange}
                        value={deviceDetail.deviceName}
                    />
                    {!configured &&
                        (
                            <>
                                <Text style={style.text}>Wifi SSID:</Text>
                                <TextInput
                                    style={style.textInput}
                                    onChangeText={handleWifiNameChange}
                                    value={deviceDetail.wifiName}
                                />
                                <Text style={style.text}>Wifi Password:</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={style.textInput}
                                    onChangeText={handleWifiPasswordChange}
                                    value={deviceDetail.wifiPassword}
                                />
                            </>

                        )
                    }
                </View>

                <Pressable
                    style={style.submitButton}
                    onPress={handleSubmit}>
                    <Text style={style.text}>Sumbit</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WifiInput;
