import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAxios } from '../../../utils/hooks/useAxios';

const Item = ({ id, name, role, email, onDelete }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>Name: {name} </Text>
      <Text style={styles.title}>Role: {role} </Text>
      <Text style={styles.title}>Email: {email} </Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(id, email)}>
      <Icon name="delete" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

const AccessData = ({ route, navigation }) => {
  const { serial } = route?.params;
  const [accessList, setAccessList] = useState([]);
  console.log(accessList);
  const { postRequest } = useAxios();

  const handleDelete = async (id, email) => {
    const newData = accessList.filter(item => item.id !== id);
    await postRequest('access_list/delete', { serial: serial, email: email });
    setAccessList(newData);
  };

  const invitationPressed = () => {
    navigation.navigate('Invitation');
  };

  const fetchAccessList = useCallback(async () => {
    const response = await postRequest('access_list/get', { serial: serial });
    setAccessList(response.data.access_list);
  }, [serial, postRequest]);

  useEffect(() => {
    fetchAccessList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Devices Access</Text>
      <FlatList
        data={accessList}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.user.name} email={item.user.email} role={item.role} onDelete={handleDelete} />
        )}
        keyExtractor={item => item.user.id}
      />
      <View style={styles.buttonContainer}>
        <CustomButton text={'Share Devices'} onPress={invitationPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default AccessData;
