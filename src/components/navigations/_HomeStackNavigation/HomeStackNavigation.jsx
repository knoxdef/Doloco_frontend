import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { Home } from '../../organisms/_Home';
import {Scanner, WifiInput} from '../../organisms';
import IotProfile from '../../organisms/_IotProfile/IotProfile';
import AccessData from '../../organisms/_AccessData/AccessData';
import Invitation from '../../organisms/_Invitation/Invitation';


const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  // const PlusIcon = <Image source={require('/assets/png/plus.png')} />;
  // const style = StyleSheet.create({
  //     header: {
  //         backgroundColor: '#AD8B73',
  //     },
  // });

  // const defineHeaderAdd = (navigation) => {
  //     return <TouchableOpacity onPress={() => navigation.navigate('FindDevice')}>{PlusIcon}</TouchableOpacity>;
  // };

  return (
    // <Stack.Navigator
    //     initialRouteName="Home"
    // >
    //     <Stack.Screen
    //         name="HomePage"
    //         component={InitialHome}
    //         options={({ navigation }) => ({
    //             title: 'Home',
    //             headerStyle: style.header,
    //             headerRight: () => {
    //                 return defineHeaderAdd(navigation);
    //             },
    //             headerRightContainerStyle: {
    //                 paddingEnd: 25,
    //             },
    //         })}
    //     />
    //     <Stack.Screen
    //         name="FindDevice"
    //         component={Scanner}
    //         options={() => ({
    //             title: 'Add New Device',
    //             headerStyle: style.header,
    //         })}
    //     />
    //     <Stack.Screen
    //         name="WifiInput"
    //         component={WifiInput}
    //         options={() => ({
    //             title: 'Input Wifi Information',
    //             headerStyle: style.header,
    //         })}
    //     />
    // </Stack.Navigator >

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
        })}
      />
      <Stack.Screen
        name="WifiInput"
        component={WifiInput}
        options={() => ({
          title: 'Input Wifi Information',
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
        name="AccessData"
        component={AccessData}
        options={() => ({
          title: 'Data Pengguna IoT',
        })}
      />
      <Stack.Screen
        name="Invitation"
        component={Invitation}
        options={() => ({
          title: 'Send Invitation',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
