import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBle } from '../../../utils/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

const Scanner = () => {
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
            alignItems: 'center', gap: 10, padding: 20
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
    });

    const onItemPressHandler = () => {
        try {
            
        } catch (error) {

        }
    };

    return (
        <SafeAreaView style={style.screen}>
            <Pressable
                style={style.scanButton}
                onPress={() => { setFirstScanInitiated(true); initializeBluetooth(); }}
            >
                <Text style={style.scanButtonText}>{firstScanInitiated === true ? 'Scan Again' : 'Scan Now'}</Text>
            </Pressable>
            <View style={style.scanResultContainer}>
                <Text style={style.scanResultHeader}>Available Device</Text>
                <ScrollView
                    contentContainerStyle={style.scanResultContentContainer}
                    style={style.scanResultList}
                >
                    {allDevices.map((data) => {
                        return (
                            <Pressable key={data?.id} style={style.scanResultItem}>
                                <Text style={style.text}>{data?.name}</Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

        </SafeAreaView >
    );
};

export default Scanner;
