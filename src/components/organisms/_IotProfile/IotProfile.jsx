import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Alert, TextInput, Keyboard } from 'react-native';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { Dropdown } from 'react-native-element-dropdown';
import { useBiometric } from '../../../utils/hooks/useBiometric';
import { useAxios } from '../../../utils/hooks/useAxios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IotProfile = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const { name, serial } = route?.params;
  const [pinValue, setPinValue] = useState('');

  const { removeFromExistingData } = useAsyncStorage();
  const { checkBiometrics, simplyPrompt } = useBiometric();
  const { postRequest } = useAxios();

  const handleDelete = () => {
    removeFromExistingData('iot_list', serial);
    navigation.navigate('Home', { refresh: true });
  };

  const handleAccess = async () => {
    try {
      if (value === 'Fingerprint') {
        if (await checkBiometrics()) {
          if (await simplyPrompt()) {
            console.log(serial);
            await postRequest('fingerprint/access', { email: 'asd@asd.com', serial: serial });
          } else {
            console.log('Biometric prompt cancelled');
          }
        } else {
          console.log('Biometric not available');
        }
      } else if (value === 'Pin') {
        setPinValue('');
        Keyboard.dismiss();
        await postRequest('fingerprint/access', { email: 'asd@asd.com', serial: serial, pin: pinValue });
      } else {
        Alert.alert('Warning', 'Select Your Access Type...');
      }
    } catch (error) {
      console.error('Error during access handling:', error);
    }
  };

  const accesstypeList = [
    { label: 'Fingerprint', value: 'Fingerprint' },
    { label: 'Pin', value: 'Pin' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.toolName}>{name}</Text>
        <View style={styles.switchContainer}>

          <Dropdown
            style={styles.dropdown}
            itemTextStyle={styles.dropdownItemText}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={{ color: 'grey' }}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Select Access Type..."
            data={accesstypeList}
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />

          {value === 'Pin' &&
            <View style={{ width: Dimensions.get('window').width * 0.7, alignItems: 'center'}}>
              <TextInput
                keyboardType={'number-pad'}
                style={styles.input}
                onChangeText={(val) => { setPinValue(val); }}
                value={pinValue}
                placeholder="Input Your Pin Number..."
                placeholderTextColor={'gray'}
              />
            </View>
          }

          <TouchableOpacity onPress={handleAccess}>
            <Text style={styles.accessButton}>Open Door</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iotFooterContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={{ alignItems: 'center' }}
        >
          <Icon name="restore" size={30} color="black" />
          <Text >History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AccessData', { serial: serial })}
          style={{ alignItems: 'center' }}
        >
          <Icon name="key" size={30} color="black" />
          <Text >Access</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={{ alignItems: 'center' }}
        >
          <Icon name="delete" size={30} color="black" />
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE9',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  toolName: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
    marginBottom: 20,
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  iotFooterContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  acButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#1f97ff',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dlButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#ff3333',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  hisButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'magenta',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dropdown: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  dropdownItemText: {
    color: 'black',
  },
  selectedTextStyle: {
    color: 'black',
  },
  accessButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
  },

});

export default IotProfile;
