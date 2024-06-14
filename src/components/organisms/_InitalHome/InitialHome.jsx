import React from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyHome } from '../../../utils/dummyData/homeDummy';

const InitialHome = () => {
    const style = StyleSheet.create({
        list: {
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: 20,
            overflow: 'scroll',
        },
        item: {
            width: '85%',
            backgroundColor: '#E3CAA5',
            alignItems: 'center',
            paddingVertical: 35,
            borderRadius: 20,
        },
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={style.list}>
                    {dummyHome.map((data) => {
                        return (
                            <Pressable style={style.item} onPress={() => Alert.alert(`${data.name}`)} key={data.id}>
                                <Text>{data.name}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InitialHome;
