import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, TextInput, Keyboard } from 'react-native';
import { useAsyncStorage, useAxios, useBiometric, useManager } from '../../../utils/hooks';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

const IotProfile = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [temp, setTemp] = useState();
  const [user, setUser] = useState();
  const { name, serial } = route?.params;
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const { getData } = useAsyncStorage();
  const { checkBiometrics, simplyPrompt } = useBiometric();
  const { postRequest } = useAxios();
  const { findSpecificDeviceAndConnect } = useManager();

  const deleteMessage = () => {    
    setShowAlert(true);
    setAlertTitle('Warning');
    setAlertMessage('Are you sure want to delete this device?');
    
  };

  const handleDelete = async () => {
    const response = await postRequest('access_list/delete-all', {serial: serial});

    if(response.status === 200) navigation.navigate('Home');
  }

  const fetchUserRole = useCallback(async () => {
    const userData = await getData('user');
    setUser(userData);
    const response = await postRequest('access_list/role', { email: userData.email, serial: serial });
    setTemp(response.data.Access);
  }, [getData, postRequest, serial]);

  useFocusEffect(
    useCallback(() => {
      fetchUserRole();
    }, [])
  );

  const handleAccess = async () => {
    try {
      if (value === 'Fingerprint') {
        if (await checkBiometrics()) {
          if (await simplyPrompt()) {
            const response = await postRequest('fingerprint/access', { email: user.email, serial: serial });
            if (response.status === 200) {
              setShowAlert(true);
              setAlertTitle('Success');
              setAlertMessage('Access request granted');
            }
          } else {
            console.log('Biometric prompt cancelled');
          }
        } else {
          console.log('Biometric not available');
        }
      } else if (value === 'Pin') {
        Keyboard.dismiss();
        setPinValue('');
        const response = await postRequest('fingerprint/access', { email: user.email, serial: serial, pin: pinValue });
        if (response.status === 200) {
          setShowAlert(true);
          setAlertTitle('Success');
          setAlertMessage('Access request granted');
        }
      } else {
        setShowAlert(true);
        setAlertTitle('Warning');
        setAlertMessage('Please select your access type');
      }
    } catch (error) {
      setShowAlert(true);
      setAlertTitle('Error');
      setAlertMessage('Access request denied');
    }
  };

  const accesstypeList = [
    { label: 'Fingerprint', value: 'Fingerprint' },
    { label: 'Pin', value: 'Pin' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <AwesomeAlert
        show={showAlert}
        title={alertTitle}
        titleStyle={{
          color: alertTitle === 'Success' ? 'green' : alertTitle === 'Error' ? 'red' : 'orange',
          fontSize: 30,
          fontWeight: 'bold',
        }}
        message={alertMessage}
        showConfirmButton={true}
        showCancelButton={true}
        confirmButtonColor={'green'}
        cancelButtonColor={'red'}
        confirmText={'Yes'}
        cancelText={'No'}
        onConfirmPressed={handleDelete}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        closeOnTouchOutside={false}
      />

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
            <View style={{ width: Dimensions.get('window').width * 0.7, alignItems: 'center' }}>
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
          onPress={() => navigation.navigate('History', { serial: serial })}
          style={styles.iconWrapper}
        >
          <Icon name="restore" size={30} color="black" />
          <Text >History</Text>
        </TouchableOpacity>

        {temp && temp.role !== 'user' &&
          <TouchableOpacity
            onPress={() => navigation.navigate('AccessData', { serial: serial })}
            style={styles.iconWrapper}
          >
            <Icon name="key" size={30} color="black" />
            <Text >Manage Access</Text>
          </TouchableOpacity>
        }

        {temp && temp.role !== 'user' &&
          <TouchableOpacity
            onPress={async () => {
              const response = await findSpecificDeviceAndConnect(serial);
              if (response) {
                navigation.navigate('WifiInput', { deviceName: response.name, deviceId: response.id, configured: false });
              }
            }}
            style={styles.iconWrapper}
          >
            <Icon name="wifi" size={30} color="black" />
            <Text >Set Wifi</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity
          onPress={deleteMessage}
          style={styles.iconWrapper}
        >
          <Icon name="delete" size={30} color="black" />
          <Text>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={styles.iconWrapper}
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
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  iconWrapper: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
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
