import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PinNumberBlock } from '../../molecules';

const IotProfile = ({ route }) => {
  const navigation = useNavigation();
  const { name, serial } = route?.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.toolName}>{name}</Text>
        <View style={styles.switchContainer}>
          <Text style={{ color: 'black' }}>Your Pin Number:</Text>
        </View>
      </View>
      <View style={styles.iotFooterContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('AccessData')}>
          <Text style={styles.acButton}>Access</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
  }
});

export default IotProfile;