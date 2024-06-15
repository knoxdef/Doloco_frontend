import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {dummyHome} from '../../../utils/dummyData/homeDummy';
import ListItem from '../../../utils/dummyData/ListItem';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hello, Welcome to Doloco</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FindDevice')}>
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
        </View>

        <View>
          {dummyHome.map(data => (
            <ListItem
              key={data.id}
              name={data.name}
              onPress={() =>
                navigation.navigate('IotProfile', {name: data.name})
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
    paddingBottom: 80, // Adjust the padding value to fit your design
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
