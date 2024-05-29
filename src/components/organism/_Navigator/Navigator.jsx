import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Profile } from '../_Profile';
import { Home } from '../_Home';
import { Add } from '../_Add';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeIcon = <Image source={require('/assets/png/Home.png')} />;
const ProfileIcon = <Image source={require('/assets/png/Profile.png')} />;
const PlusIcon = <Image source={require('/assets/png/plus.png')} />;

const HomeStackNavigator = () => {
    const defineHeaderAdd = (navigation) => {
        return <TouchableOpacity onPress={() => navigation.navigate('AddPage')}>{PlusIcon}</TouchableOpacity>;
    };

    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen
                name="HomePage"
                component={Home}
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
                name="AddPage"
                component={Add}
                options={() => ({
                    title: 'Add New Device',
                    headerStyle: style.header,
                })}
            />
        </Stack.Navigator >
    );
};

const MainTabNavigator = () => {
    const defineBottonIcon = (name) => {
        return name === 'HomeStack' ? HomeIcon : ProfileIcon;
    };

    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    return defineBottonIcon(route.name);
                },
                tabBarStyle: style.footer,
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{ title: 'Home' }} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator >
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <MainTabNavigator />
        </NavigationContainer>
    );
};

const style = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFBE9',
    },
    header: {
        backgroundColor: '#AD8B73',
    },
    footer: {
        backgroundColor: '#AD8B73',
        height: '8%',
    },
});

export default Navigator;
