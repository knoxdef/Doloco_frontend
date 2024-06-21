import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { Dropdown } from 'react-native-element-dropdown';

const IotProfile = ({ route }) => {
  const navigation = useNavigation();
  const { name, serial } = route?.params;
  const { removeFromExistingData } = useAsyncStorage();

  const [value, setValue] = useState('');

  const handleDelete = () => {
    removeFromExistingData("iot_list", serial);
    navigation.navigate("Home", { forReset: "Ignore this" });
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
            placeholder="Select Access Way..."
            data={accesstypeList}
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />

          <Text style={{ color: 'black' }}>Button to Access</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.dlButton}>Open/Close</Text>
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
    width: Dimensions.get('window').width * 0.8,
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
  }
});

export default IotProfile;