import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { Profile } from '../../organism';
import { HomeStackNavigation } from '../_HomeStackNavigation';
import { NavigationContainer } from '@react-navigation/native';

const MainTabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const HomeIcon = <Image source={require('/assets/png/Home.png')} />;
    const ProfileIcon = <Image source={require('/assets/png/Profile.png')} />;
    const style = StyleSheet.create({
        footer: {
            backgroundColor: '#AD8B73',
            height: '8%',
        },
    });

    const defineBottonIcon = (name) => {
        return name === 'HomeStack' ? HomeIcon : ProfileIcon;
    };

    return (
        <NavigationContainer>
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
                    component={HomeStackNavigation}
                    options={{ title: 'Home' }} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainTabNavigation;
