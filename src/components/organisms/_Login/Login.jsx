import React, { useState } from 'react';
import { Alert, ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useAxios } from '../../../utils/hooks/useAxios';
import { HttpStatusCode } from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  const { postRequest } = useAxios();
  const { addToExisting } = useAsyncStorage();

  const onPressLogin = async () => {
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const response = await postRequest('login', { email: email, password: password });

      if (response.status === HttpStatusCode.Ok) {
        const responseUser = response.data.data;
        await addToExisting('user', { email: responseUser.email, username: responseUser.name });
      }
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressRegister = () => {
    navigation.navigate('Register');
  };

  const onPressForgotPassword = () => {
    navigation.navigate('Forgot');
  };

  const validate = () => {
    const newErrors = {};

    if (!email.includes('@')) {
      newErrors.email = 'Email must be a valid email address.';
    }
    if (password.length < 1) {
      newErrors.password = 'Password must not be empty.';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.headSignIn}>Login</Text>

        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.inputCointainer}
            placeholder="Email"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>


        <View style={{ width: "100%" }}>

          <TextInput
            style={styles.inputCointainer}
            placeholder="Password"
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

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
    color: 'black',
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
    gap: 15,
  },
  headSignIn: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
  },
  bottomButton: {
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
