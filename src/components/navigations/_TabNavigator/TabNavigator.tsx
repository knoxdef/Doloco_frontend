import {View, Text} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';

import {HomeStackNavigation} from '../_HomeStackNavigation';
import {Profile} from '../../organisms/_Profile';

type RootTabParamList = {
  HomeStack: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#ad8b73'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={({route}: {route: RouteProp<RootTabParamList, 'HomeStack'>}) => ({
          tabBarStyle: {
            display: getTabVisibility(route),
            backgroundColor: '#ad8b73',
          },
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({route}: {route: RouteProp<RootTabParamList, 'Profile'>}) => ({
          tabBarStyle: {
            display: getTabVisibility(route),
            backgroundColor: '#ad8b73',
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const getTabVisibility = (route: RouteProp<RootTabParamList, 'HomeStack' | 'Profile'>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if (
    routeName == 'IotProfile' ||
    routeName == 'AccessData' ||
    routeName == 'Invitation'
  ) {
    return 'none';
  }

  return 'flex';
};
