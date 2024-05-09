import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

const LoginApp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(255,251,233)'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>

            <TextInput
              style={styles.inputControl}
              value={form.email}
              onChangeText={email => setForm({...form, email})}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {},
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
});

export default LoginApp;
