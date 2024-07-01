import React, { useCallback, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const { removeFromExistingData, getData } = useAsyncStorage();

  const handleSignOut = () => {
    removeFromExistingData('user');
  };

  const handleInbox = () => {
    navigation.navigate('Inbox');
  };

  const fetchUser = useCallback(async () => {
    try {
      const data = await getData('user');
      if (data) {
        setUsername(data.username);
      } else {
        setUsername('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [getData]);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  return (
    <SafeAreaView style={style.screen}>
      <View>
        <Ionicons name="person-circle-outline" color={'black'} size={Dimensions.get('window').width * 0.5} />
        <Text style={style.nameText}>{username}</Text>
      </View>

      <View style={style.buttonContainer}>
        <Pressable style={style.button} onPress={handleInbox}>
          <Icon
            name="mail"
            size={30}
            color="black"
            style={style.icon}
          />
          <Text style={style.text}>Inbox</Text>
        </Pressable>
      </View>

      <View style={style.buttonContainer}>
        <Pressable style={style.button} onPress={handleSignOut}>
          <Icon
            name="logout"
            size={30}
            color="black"
            style={style.icon}
          />
          <Text style={style.text}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    flex: 7.5,
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
    paddingHorizontal: 30,
    borderWidth: 3,
    borderRadius: Dimensions.get('window').width,
    borderColor: '#AD8B73',
    backgroundColor: '#E3CAA5',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    flex: 2.5,
  },
});

export default Profile;
