import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAxios, useManager } from '../../../utils/hooks';
import AwesomeAlert from 'react-native-awesome-alerts';

const Scanner = ({ navigation }) => {
    const [firstScanInitiated, setFirstScanInitiated] = useState(false);
    const [existingIotDevices, setExistingIotDevices] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { checkBluetoothState, startScanning, connectToDevice, startNotification, readNotification, allDevices } = useManager();
    const { getRequest } = useAxios();

    const style = StyleSheet.create({
        screen: {
            gap: 20,
            flex: 1,
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scanButton: {
            width: Dimensions.get('window').width * 0.75,
            height: Dimensions.get('window').width * 0.75,
            borderRadius: Dimensions.get('window').width * 0.75,
            borderWidth: 5,
            borderColor: '#AD8B73',
            backgroundColor: '#E3CAA5',
            justifyContent: 'center',
            alignItems: 'center',
        },
        scanButtonText: {
            color: 'black',
            fontSize: 30,
        },
        scanResultContainer: {
            flex: 1,
            gap: 15,
            width: '100%',
            alignItems: 'center',
            display: firstScanInitiated === true ? 'flex' : 'none',
        },
        scanResultList: {
            width: '100%',
        },
        scanResultContentContainer: {
            alignItems: 'center', gap: 10, padding: 20,
        },
        scanResultItem: {
            width: '80%',
            paddingVertical: 20,
            borderWidth: 3,
            borderRadius: Dimensions.get('window').width,
            borderColor: '#AD8B73',
            backgroundColor: '#E3CAA5',
            alignItems: 'center',
        },
        scanResultHeader: {
            color: 'black',
            fontSize: 20, padding: 15,
            borderTopWidth: 2,
            borderBottomWidth: 2,
        },
        text: {
            color: 'black',
        },
        noFirstInitiationText: {
            color: 'black',
            fontSize: 20,
            fontWeight: '900',
        },
    });

    const onItemPressHandler = async (device) => {
        try {
            await connectToDevice(device.id);
            await startNotification(device.id);
            const wifiStatus = await readNotification(device.id, 'wifi');
            const stringValue = String.fromCharCode.apply(null, new Uint8Array(wifiStatus));

            if (stringValue === 'configured') {
                navigation.navigate('WifiInput', { deviceId: device.id, deviceName: device.name, configured: true });
            } else {
                navigation.navigate('WifiInput', { deviceId: device.id, deviceName: device.name, configured: false });
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchExistingIotDevices = async () => {
            try {
                const response = await getRequest('iot_tool', {});
                if (response.status === 200) {
                    setExistingIotDevices(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching existing IoT devices:', error);
            }
        };

        fetchExistingIotDevices();
    }, []);

    useEffect(() => {
        const filterDevices = () => {
            if (existingIotDevices.length > 0) {
                const filtered = allDevices.filter(device =>
                    !existingIotDevices.some(existingDevice => existingDevice.serial === device.name)
                );
                setFilteredDevices(filtered);
            } else {
                setFilteredDevices(allDevices);
            }
        };

        filterDevices();
    }, [allDevices, existingIotDevices]);

    return (
        <SafeAreaView style={style.screen}>

            <AwesomeAlert
                show={showAlert}
                title={alertTitle}
                titleStyle={{
                    color:
                        alertTitle === 'Success'
                            ? 'green'
                            : alertTitle === 'Error'
                                ? 'red'
                                : 'orange',
                    fontSize: 30,
                    fontWeight: 'bold',
                }}
                message={alertMessage}
                showCancelButton={true}
                cancelButtonColor={'orange'}
                cancelText={'Close'}
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                closeOnTouchOutside={false}
            />

            {!firstScanInitiated ? (<Text style={style.noFirstInitiationText}>Let's start to find your device</Text>) : ('')}
            <Pressable
                style={style.scanButton}
                onPress={async () => {
                    const test = await checkBluetoothState();
                    if (test === 'on') {
                        setFirstScanInitiated(true);
                        startScanning();
                    } else {
                        setShowAlert(true);
                        setAlertTitle('Warning');
                        setAlertMessage('Please turn on your bluetooth');
                    }
                }}
            >
                <Text style={style.scanButtonText}>{firstScanInitiated === true ? 'Scan Again' : 'Scan Now'}</Text>
            </Pressable>
            {!firstScanInitiated ? (<Text style={style.noFirstInitiationText}>Click button above</Text>) : ('')}

            <View style={style.scanResultContainer}>
                <Text style={style.scanResultHeader}>Available Device</Text>
                <ScrollView
                    contentContainerStyle={style.scanResultContentContainer}
                    style={style.scanResultList}
                >
                    {filteredDevices.map((device) => {
                        return (
                            <Pressable key={device?.id} style={style.scanResultItem} onPress={() => onItemPressHandler(device)}>
                                <Text style={style.text}>{device?.name}</Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

        </SafeAreaView >
    );
};

export default Scanner;
