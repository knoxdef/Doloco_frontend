import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Login} from '../../organisms/_Login';
import {Register} from '../../organisms/_Register';
import TabNavigator from '../_TabNavigator/TabNavigator';
import {useAsyncStorage} from '../../../utils/hooks/useAsyncStorage';
import {ForgotPassword} from '../../organisms/_ForgotPassword';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user, setUser] = useState({id: '', username: ''});

  const {getData} = useAsyncStorage();

  const fetchUser = useCallback(async () => {
    try {
      const data = await getData('user');
      if (data) {
        setUser({id: data.id, username: data.name});
      } else {
        setUser({id: '', username: ''});
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }, [getData]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user.id !== '' ? (
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
