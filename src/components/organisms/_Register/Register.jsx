import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import { useAxios } from '../../../utils/hooks/useAxios';
import { HttpStatusCode } from 'axios';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const { postRequest } = useAxios();
  const { addToExisting } = useAsyncStorage();

  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};

    if (username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters long.';
    }
    if (!email.includes('@')) {
      newErrors.email = 'Email must be a valid email address.';
    }
    if (password.length < 7) {
      newErrors.password = 'Password must be at least 7 characters long.';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onPressregister = async () => {
    setloading(true);

    if (!validate()) {
      setloading(false);
      return;
    }

    try {
      const response = await postRequest('register', { name: username, email: email, password: password });

      if (response.status === HttpStatusCode.Created) {
        const responseUser = response.data.user;
        await addToExisting('user', { email: responseUser.email, username: responseUser.name });
      }
    } catch (error) {
      Alert.alert('Registration failed', error.message);
    } finally {
      setloading(false);
    }
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.headSignIn}>Register</Text>

        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.inputCointainer}
            placeholder="Username"
            placeholderTextColor={'grey'}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>

        <View style={{ width: "100%" }}>

          <TextInput
            style={styles.inputCointainer}
            placeholder="Email"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>


        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <Pressable onPress={onPressregister} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        )}

      </View>
      <View style={styles.bottomButton}>
        <CustomButton text="Have an account? Login Here" onPress={onPressLogin} type="TERTIARY" />
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
  errorText: {
    color: 'red',
    marginBottom: 10,
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
});

export default Register;
