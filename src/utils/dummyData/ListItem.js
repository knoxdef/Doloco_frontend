import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ListItem({name, onPress}) {
  return (
    <TouchableOpacity style={styles.list} onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  item: {
    width: '85%',
    backgroundColor: '#E3CAA5',
    paddingVertical: 35,
    borderRadius: 10,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
