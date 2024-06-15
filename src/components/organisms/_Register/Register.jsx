import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import CustomInput from '../../../buttonInputs/CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    const navigation = useNavigation();
  
    const onPressSignIn = () => {
      console.warn('Sign Up');

      navigation.navigate('Home');
    };
  
    const onPressForgotPassword = () => {
      console.warn('onPressForgotPassword');
    };
  
    const onPressLogin = () => {
      console.warn('onPressLogin');
  
      navigation.navigate('Login');
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.root}>
          <Text style={styles.headSignIn}>Sign Up</Text>
  
          <CustomInput
            placeholder="Username"
            value={Username}
            setValue={setUsername}
          />
  
          <CustomInput placeholder="Email" value={Email} setValue={setEmail} />
  
          <CustomInput
            placeholder="Password"
            value={Password}
            setValue={setPassword}
            secureTextEntry={true}
          />
  
          <CustomButton text="Sign Up" onPress={onPressSignIn} />
  
          <CustomButton
            text="Forgot password?"
            onPress={onPressForgotPassword}
            type="TERTIARY"
          />
        </View>
        <View style={styles.bottomButton}>
          <CustomButton
            text="Have and account? Login Here"
            onPress={onPressLogin}
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
  
  export default Register;
