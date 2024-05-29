import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBle } from '../../../utils/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

const Add = () => {
    const [firstScanInitiated, setFirstScanInitiated] = useState(false);
    const { initializeBluetooth, allDevices } = useBle();

    const style = StyleSheet.create({
        screen: {
            gap: 20,
            height: '100%',
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
        scanResult: {
            backgroundColor: 'yellow',
            display: firstScanInitiated === true ? 'flex' : 'none',
        },
    });

    return (
        <SafeAreaView style={style.screen}>
            <Pressable
                style={style.scanButton}
                onPress={() => { setFirstScanInitiated(true); initializeBluetooth(); }}
            >
                <Text style={style.scanButtonText}>{firstScanInitiated === true ? 'Scan Again' : 'Scan Now'}</Text>
            </Pressable>

            <ScrollView style={style.scanResult}>
                <View style={style.list}>
                    {allDevices.map((data) => {
                        return (
                            <Text style={{ color: 'black' }}>{data.name}</Text>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;
