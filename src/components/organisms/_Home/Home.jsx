import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { dummyHome } from '../../../utils/dummyData/homeDummy';
import ListItem from '../../../utils/dummyData/ListItem';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Welcome to Doloco</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FindDevice')}>
          <Ionicons name="add-circle-outline" size={35} color={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          {dummyHome.map(data => (
            <ListItem
              key={data.id}
              name={data.name}
              onPress={() =>
                navigation.navigate('IotProfile', { name: data.name })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 15,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Home;
