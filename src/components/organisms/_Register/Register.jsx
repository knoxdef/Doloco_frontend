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

  const { postRequest } = useAxios();
  const { addToExisting } = useAsyncStorage();

  const navigation = useNavigation();

  const onPressregister = async () => {
    setloading(true);
    try {
      const response = await postRequest('register', { name: username, email: email, password: password });

      if (response.status === HttpStatusCode.Created) {
        const responseUser = response.data.user;
        await addToExisting('user', { id: responseUser.id, username: responseUser.name });
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
        <Text style={styles.headSignIn}>Sign Up</Text>

        <TextInput
          style={styles.inputCointainer}
          placeholder="Username"
          placeholderTextColor={'grey'}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.inputCointainer}
          placeholder="Email"
          placeholderTextColor={'grey'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputCointainer}
          placeholder="Password"
          placeholderTextColor={'grey'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />

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

export default Register;
