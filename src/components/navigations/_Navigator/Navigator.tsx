import {View, Text} from 'react-native';
import React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Login } from '../../organisms/_Login';
import { Register } from '../../organisms/_Register';
import { Home } from '../../organisms/_Home';
import { Profile } from '../../organisms/_Profile';
import IotProfile from '../../organisms/_IotProfile/IotProfile';
import AccessData from '../../organisms/_AccessData/AccessData';
import Invitation from '../../organisms/_Invitation/Invitation';
import { Scanner, WifiInput } from '../../organisms';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen 
            name="FindDevice"
            component={Scanner}
            options={() => ({
                title: 'Add New Device',
                // headerStyle: style.header,
            })}
        />
        <Stack.Screen
            name="WifiInput"
            component={WifiInput}
            options={() => ({
                title: 'Input Wifi Information',
                // headerStyle: style.header,
            })}
        />
        <Stack.Screen
          name="IotProfile"
          component={IotProfile}
          options={({route}) => ({
            title: route.params?.name,
          })}
        />
        <Stack.Screen 
            name='AccessData'
            component={AccessData}
            options={() => ({
                title: 'Data Pengguna IoT'
            })}
        />
        <Stack.Screen 
            name='Invitation'
            component={Invitation}
            options={() => ({
                title: 'Send Invitation'
            })}
        />
      </Stack.Navigator>
    );
  };
  
  const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: {backgroundColor: '#ad8b73'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({route}) => ({
            tabBarStyle: {display: getTabVisibility(route), backgroundColor: '#ad8b73'},
            tabBarIcon: ({color}) => (
              <Entypo name="home" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({route}) => ({
            tabBarStyle: {display: getTabVisibility(route), backgroundColor: '#ad8b73'},
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          })}
        />
      </Tab.Navigator>
    );
  };

const MainStack = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
    );
};

const getTabVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  
    if(routeName == 'IotProfile' || routeName == 'AccessData' || routeName == 'Invitation') {
      return 'none';
    }
  
    return 'flex';
  };

const Navigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
