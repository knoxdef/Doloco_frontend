import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Alert } from 'react-native';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { Dropdown } from 'react-native-element-dropdown';
import { useBiometric } from '../../../utils/hooks/useBiometric';

const IotProfile = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const { name, serial } = route?.params;
  const { removeFromExistingData } = useAsyncStorage();
  const { checkBiometrics, checkBiometricKeyExist, createKeys, createSignature } = useBiometric();

  const handleDelete = () => {
    removeFromExistingData('iot_list', serial);
    navigation.navigate('Home', { refresh: true });
  };

  const handleAccess = async () => {
    if (value === 'Fingerprint') {
      const available = await checkBiometrics();
      if (available) {
        const result = await checkBiometricKeyExist();

        if (result) {
          createSignature('Enter Your Fingerprint', JSON.stringify({ test: 'Test' }));  //put user id and serial
        } else {
          createKeys();
        }

      } else {
        console.log('Biometric not available');
      }
    } else if (value === 'Pin') {
      Alert.alert('Pin');
    } else {
      Alert.alert('Warning', 'Select Your Access Type...');
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

          <Text style={{ color: 'black' }}>Select Your Access Type:</Text>

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

          <Text style={{ color: 'black' }}>Button to Access</Text>
          <TouchableOpacity onPress={handleAccess}>
            <Text style={styles.accessButton}>Open Door</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iotFooterContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AccessData')}>
          <Text style={styles.acButton}>Access</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.dlButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  dropdown: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.1,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
});

export default IotProfile;
