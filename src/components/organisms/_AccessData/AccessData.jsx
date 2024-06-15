import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../buttonInputs/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialData = [
  {id: '1', name: 'People 1'},
  {id: '2', name: 'People 2'},
  {id: '3', name: 'People 3'},
  {id: '4', name: 'People 4'},
  {id: '5', name: 'People 5'},
  {id: '6', name: 'People 6'},
];

const Item = ({id, name, onDelete}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <TouchableOpacity onPress={() => onDelete(id)}>
      <Icon name="delete" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

const AccessData = () => {
  const navigation = useNavigation();

  const [data, setData] = useState(initialData);

  const handleDelete = id => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  const invitationPressed = () => {
    navigation.navigate('Invitation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Devices Access</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item id={item.id} name={item.name} onDelete={handleDelete} />
        )}
        keyExtractor={item => item.id}
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
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default AccessData;
