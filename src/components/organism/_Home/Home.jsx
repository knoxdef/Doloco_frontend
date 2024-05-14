import React from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { dummyHome } from '../../../utils/dummyData/homeDummy';

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={style.list}>
                    {dummyHome.map((data) => {
                        return (
                            <Pressable style={style.item} onPress={() => Alert.alert(`${data.name}`)}>
                                <Text>{data.name}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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

export default Home;
