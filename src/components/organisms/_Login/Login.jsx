import React, { useState } from 'react';
import { Alert, ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import { FIREBASE_AUTH } from '../../../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onPressLogin = async () => {
    setLoading(true);
    try {
      // Sign in user with email and password using FIREBASE_AUTH instance
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Navigate to the next screen
      navigation.navigate('TabNavigator');
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressRegister = () => {
    navigation.navigate('Register');
  };

  const onPressForgotPassword = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.headSignIn}>Login</Text>

        <TextInput
          style={styles.inputCointainer}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputCointainer}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <Pressable onPress={onPressLogin} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        )}

        <CustomButton
          text="Forgot password?"
          onPress={onPressForgotPassword}
          type="TERTIARY"
        />
      </View>
      <View style={styles.bottomButton}>
        <CustomButton
          text="Don't have an account? Register Here"
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
  inputCointainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#AD8B73',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000000',
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
  bottomButton: {
    padding: 20,
  },
});

export default Login;
