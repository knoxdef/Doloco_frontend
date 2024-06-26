import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../../organisms/_Home';
import { Scanner, WifiInput } from '../../organisms';
import IotProfile from '../../organisms/_IotProfile/IotProfile';
import AccessData from '../../organisms/_AccessData/AccessData';
import Invitation from '../../organisms/_Invitation/Invitation';

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFBE9' },
        }}
      />
      <Stack.Screen
        name="FindDevice"
        component={Scanner}
        options={() => ({
          title: 'Add New Device',
          contentStyle: { backgroundColor: '#FFFBE9' },
        })}
      />
      <Stack.Screen
        name="WifiInput"
        component={WifiInput}
        options={() => ({
          title: 'Input Wifi Information',
          contentStyle: { backgroundColor: '#FFFBE9' },
        })}
      />
      <Stack.Screen
        name="IotProfile"
        component={IotProfile}
        options={({ route }) => ({
          title: route.params?.name,
          contentStyle: { backgroundColor: '#FFFBE9' },
        })}
      />
      <Stack.Screen
        name="AccessData"
        component={AccessData}
        options={() => ({
          title: 'Data Pengguna IoT',
          contentStyle: { backgroundColor: '#FFFBE9' },
        })}
      />
      <Stack.Screen
        name="Invitation"
        component={Invitation}
        options={() => ({
          title: 'Send Invitation',
          contentStyle: { backgroundColor: '#FFFBE9' },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
