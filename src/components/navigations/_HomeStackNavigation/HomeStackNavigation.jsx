import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { InitialHome, Scanner, WifiInput } from '../../organisms';

const HomeStackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const PlusIcon = <Image source={require('/assets/png/plus.png')} />;
    const style = StyleSheet.create({
        header: {
            backgroundColor: '#AD8B73',
        },
    });

    const defineHeaderAdd = (navigation) => {
        return <TouchableOpacity onPress={() => navigation.navigate('FindDevice')}>{PlusIcon}</TouchableOpacity>;
    };

    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen
                name="HomePage"
                component={InitialHome}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerStyle: style.header,
                    headerRight: () => {
                        return defineHeaderAdd(navigation);
                    },
                    headerRightContainerStyle: {
                        paddingEnd: 25,
                    },
                })}
            />
            <Stack.Screen
                name="FindDevice"
                component={Scanner}
                options={() => ({
                    title: 'Add New Device',
                    headerStyle: style.header,
                })}
            />
            <Stack.Screen
                name="WifiInput"
                component={WifiInput}
                options={() => ({
                    title: 'Input Wifi Information',
                    headerStyle: style.header,
                })}
            />
        </Stack.Navigator >
    );
};

export default HomeStackNavigation;
