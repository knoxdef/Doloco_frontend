import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListItem from '../../../utils/dummyData/ListItem';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [iotList, setIotList] = useState([]);
  const { getData } = useAsyncStorage();

  const fetchData = useCallback(async () => {
    try {
      const data = await getData('iot_list');
      if (data) {
        setIotList(data);
      } else {
        setIotList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [getData]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

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
          {iotList.map((iot) => (
            <ListItem
              key={iot.serial}
              name={iot.name}
              onPress={() =>
                navigation.navigate('IotProfile', { name: iot.name, serial: iot.serial })
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
    // backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Home;
