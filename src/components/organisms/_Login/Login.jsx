import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import CustomInput from '../../../buttonInputs/CustomInput/CustomInput';

import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const navigation = useNavigation();

  const onPressLogin = () => {
    // console.warn('Login');


    navigation.navigate('TabNavigator');
  };

  const onPressForgotPassword = () => {
    console.warn('onPressForgotPassword');
  };

  const onPressRegister = () => {
    console.warn('onPressRegister');

    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.headSignIn}>Login</Text>

        <CustomInput placeholder="Email" value={Email} setValue={setEmail} />

        <CustomInput
          placeholder="Password"
          value={Password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton text="Login" onPress={onPressLogin} />

        <CustomButton
          text="Forgot password?"
          onPress={onPressForgotPassword}
          type="TERTIARY"
        />
      </View>
      <View style={styles.bottomButton}>
        <CustomButton
          text="Don't Have and account? Register Here"
          onPress={onPressRegister}
          type="TERTIARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFBE9',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headSignIn: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
});

export default Login;