import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import CustomInput from '../../../buttonInputs/CustomInput/CustomInput';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useAxios } from '../../../utils/hooks/useAxios';
import AwesomeAlert from 'react-native-awesome-alerts';

const Invitation = ({ route }) => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [note, setNote] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { serial } = route?.params;

  const { getData } = useAsyncStorage();
  const { postRequest } = useAxios();

  const sendInvitation = async () => {
    const response = await postRequest('inbox/invitation/send', { senderEmail: senderEmail, receiverEmail: receiverEmail, serial: serial, note: note });
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setReceiverEmail('');
      setNote('');
      setShowAlert(true);
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
      <AwesomeAlert
        show={showAlert}
        title='Success'
        titleStyle={{ color: 'green', fontSize: 30, fontWeight: 'bold' }}
        message='Invitation sent succesfully'
        onConfirmPressed={() => { setShowAlert(false); }}
        showConfirmButton={true}
        confirmButtonColor='green'
        confirmText='Ok'
      />
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
