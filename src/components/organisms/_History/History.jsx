import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Item = ({ id, name, date, time }) => (
    <View style={styles.item}>
        <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>{date} - {time}</Text>
        </View>
        {/* <TouchableOpacity onPress={''}>
            <Icon name="delete" size={24} color="black" />
        </TouchableOpacity> */}
    </View>
);

const dummy = [
    { id: 1, name: 'John Doe', date: '27/06/2024', time: '17:20:31' },
    { id: 2, name: 'Asd', date: '27/06/2024', time: '17:22:01' },
    { id: 3, name: 'Asd', date: '27/06/2024', time: '17:23:22' },
];

const History = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            <FlatList
                data={dummy}
                renderItem={({ item }) => (
                    <Item id={item.id} name={item.name} date={item.date} time={item.time} />
                )}
                keyExtractor={item => item.id}
            />
            {/* <View style={styles.buttonContainer}>
                <CustomButton text={'Share Devices'} onPress={invitationPressed} />
            </View> */}
        </View>
    )
}

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

export default History