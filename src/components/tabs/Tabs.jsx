import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, Profile } from '../organism';
import { Alert, Image, Pressable, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const HomeIcon = <Image source={require('/assets/png/Home.png')} />;
const ProfileIcon = <Image source={require('/assets/png/Profile.png')} />;
const PlusIcon = <Image source={require('/assets/png/plus.png')} />;

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    return route.name === 'Home' ? HomeIcon : ProfileIcon;
                },
                tabBarStyle: { height: '8%', backgroundColor: '#AD8B73' },
                tabBarShowLabel: false,
                headerStyle: { backgroundColor: '#AD8B73' },
                headerRightContainerStyle: { paddingEnd: 20 },
                headerRight: () => {
                    return <Pressable onPress={() => Alert.alert('add icon clicked')}>{PlusIcon}</Pressable>;
                },
            })}
            sceneContainerStyle={style.screen}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator >
    );
};

const style = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFBE9',
    },
});

export default Tabs;
