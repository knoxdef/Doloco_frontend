import React from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FIREBASE_AUTH } from '../../../../firebase';

const Profile = () => {
  return (
    <SafeAreaView style={style.screen}>
      <View>
        <Ionicons name='person-circle-outline' color={'black'} size={Dimensions.get('window').width * 0.5} />
        <Text style={style.nameText}>Example Name</Text>
      </View>

      <View style={style.buttonContainer}>
        <Pressable style={style.button} onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={style.text}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 50,
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  nameText: {
    color: 'black',
    fontSize: Dimensions.get('window').width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 20,
    borderWidth: 3,
    borderRadius: Dimensions.get('window').width,
    borderColor: '#AD8B73',
    backgroundColor: '#E3CAA5',
    alignItems: 'center',
  },
});

export default Profile;
