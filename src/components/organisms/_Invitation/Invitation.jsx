import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import CustomInput from '../../../buttonInputs/CustomInput/CustomInput';

const Invitation = () => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const sendInvitation = () => {
    // Handle the send invitation action here
    console.log(`Email: ${email}, Note: ${note}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <CustomInput
          placeholder={'Email'}
          value={email}
          setValue={setEmail}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note</Text>
        <CustomInput
          placeholder={'Note'}
          value={setNote}
          setValue={note}
          multiline={true}
        />
      </View>
      <CustomButton text={'Send Invitation'} onPress={sendInvitation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFBE9',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
});

export default Invitation;
