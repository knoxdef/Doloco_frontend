import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListItem from '../../../utils/dummyData/ListItem';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ navigation }) => {
  const [iotList, setIotList] = useState([]);
  const { getData } = useAsyncStorage();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const dataIot = await getData('iot_list');
      const dataUser = await getData('user');
      console.log(dataIot);
      if (dataIot) {
        const filteredData = dataIot.filter(item => item.list_for === dataUser.email);
        setIotList(filteredData);
      } else {
        setIotList([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        fetchData();
      };
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();

    setTimeout(() => { setRefreshing(false); }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Welcome to Doloco</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FindDevice')}>
          <Ionicons name="add-circle-outline" size={35} color={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {iotList.length > 0 ?
          (
            <View style={styles.listView}>
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
          )
          :
          (
            <View style={styles.noListView}>
              <TouchableOpacity onPress={(() => { navigation.navigate('FindDevice'); })}>
                <Icon name="add-circle-outline" size={Dimensions.get('window').width * 0.3} color="black" />
              </TouchableOpacity>
              <Text style={styles.noListText}>Lets find your first doloco device</Text>
              <Text style={styles.noListText}>Click icon above</Text>
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    padding: 15,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  listView: {
    flex: 1,
  },
  noListView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noListText: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '400',
  }
});

export default Home;
