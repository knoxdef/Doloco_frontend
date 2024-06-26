import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import CustomInput from '../../../buttonInputs/CustomInput/CustomInput';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useAxios } from '../../../utils/hooks/useAxios';

const Invitation = ({ route }) => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [note, setNote] = useState('');

  const { serial } = route?.params;

  const { getData } = useAsyncStorage();
  const { postRequest } = useAxios();

  const sendInvitation = async () => {
    const response = await postRequest('inbox/send_invitation', { senderEmail: senderEmail, receiverEmail: receiverEmail, serial: serial, note: note });
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setReceiverEmail('');
      setNote('');
      Alert.alert('Success', 'Invitation is sent');
    }
  };

  const fetchUser = useCallback(async () => {
    const data = await getData('user');
    if (data) {
      setSenderEmail(data.email);
    }

  }, [getData]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <CustomInput
          placeholder={'Email'}
          value={receiverEmail}
          setValue={setReceiverEmail}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note</Text>
        <CustomInput
          placeholder={'Note'}
          value={note}
          setValue={setNote}
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
