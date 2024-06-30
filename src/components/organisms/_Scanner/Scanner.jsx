import React, { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useManager from '../../../utils/hooks/useManager';

const Scanner = ({ navigation }) => {
    const [firstScanInitiated, setFirstScanInitiated] = useState(false);
    const { checkBluetoothState, startScanning, connectToDevice, startNotification, readNotification, allDevices } = useManager();
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
        }
    });

    const onItemPressHandler = async (device) => {
        try {
            await connectToDevice(device.id);
            await startNotification(device.id)
            const wifiStatus = await readNotification(device.id);
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

    return (
        <SafeAreaView style={style.screen}>
            {!firstScanInitiated ? (<Text style={style.noFirstInitiationText}>Let's start to find your device</Text>) : ('')}
            <Pressable
                style={style.scanButton}
                onPress={async () => {
                    const test = await checkBluetoothState();
                    if (test === 'on') {
                        setFirstScanInitiated(true);
                        startScanning();
                    } else {
                        Alert.alert("Warning", "Please turn on your bluetooth to use this service.");
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
                    {allDevices.map((device) => {
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
