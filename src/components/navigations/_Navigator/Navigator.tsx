import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Login} from '../../organisms/_Login';
import {Register} from '../../organisms/_Register';

import TabNavigator from '../_TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const HomeStack = () => {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//             name="FindDevice"
//             component={Scanner}
//             options={() => ({
//                 title: 'Add New Device',
//                 // headerStyle: style.header,
//             })}
//         />
//         <Stack.Screen
//             name="WifiInput"
//             component={WifiInput}
//             options={() => ({
//                 title: 'Input Wifi Information',
//                 // headerStyle: style.header,
//             })}
//         />
//         <Stack.Screen
//           name="IotProfile"
//           component={IotProfile}
//           options={({route}) => ({
//             title: route.params?.name,
//           })}
//         />
//         <Stack.Screen
//             name='AccessData'
//             component={AccessData}
//             options={() => ({
//                 title: 'Data Pengguna IoT'
//             })}
//         />
//         <Stack.Screen
//             name='Invitation'
//             component={Invitation}
//             options={() => ({
//                 title: 'Send Invitation'
//             })}
//         />
//       </Stack.Navigator>
//     );
//   };

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator screenOptions={{
//       tabBarStyle: {backgroundColor: '#ad8b73'},
//       tabBarInactiveTintColor: '#fff',
//       tabBarActiveTintColor: 'black',
//       headerShown: false,
//     }}>
//       <Tab.Screen
//         name="Home"
//         component={HomeStackNavigation}
//         options={({route}) => ({
//           tabBarStyle: {display: getTabVisibility(route), backgroundColor: '#ad8b73'},
//           tabBarIcon: ({color}) => (
//             <Entypo name="home" color={color} size={26} />
//           ),
//         })}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={({route}) => ({
//           tabBarStyle: {display: getTabVisibility(route), backgroundColor: '#ad8b73'},
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           ),
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

// const MainStack = () => {
//   return (

//   );
// };

// const getTabVisibility = route => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

//   if (
//     routeName == 'IotProfile' ||
//     routeName == 'AccessData' ||
//     routeName == 'Invitation'
//   ) {
//     return 'none';
//   }

//   return 'flex';
// };

const Navigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
