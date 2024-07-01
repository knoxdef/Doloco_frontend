import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAxios } from '../../../utils/hooks/useAxios';
import moment from 'moment';

const Item = ({ id, name, date, time }) => (
    <View style={styles.item}>
        <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>{date} - {time}</Text>
        </View>
    </View>
);

const dummy = [
    { id: 1, name: 'John Doe', date: '27/06/2024', time: '17:20:31' },
    { id: 2, name: 'Asd', date: '27/06/2024', time: '17:22:01' },
    { id: 3, name: 'Asd', date: '27/06/2024', time: '17:23:22' },
];

const History = ({ route }) => {
    const [historyData, setHistoryData] = useState([]);

    const { serial } = route?.params;
    const { postRequest } = useAxios();

    const fetchHistory = useCallback(async () => {
        const response = await postRequest('history/get', { serial: serial });
        const data = response.data.histories;
        const formattedData = data.map(item => ({
            ...item,
            createdAt_date: moment(item.created_at).format('DD/MM/YYYY'),
            createdAt_time: moment(item.created_at).format('HH:mm:ss'),
            updatedAt_date: moment(item.updated_at).format('DD/MM/YYYY'),
            updatedAt_time: moment(item.updated_at).format('HH:mm:ss'),
        }));
        setHistoryData(formattedData);
    }, [postRequest, serial]);

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            <FlatList
                data={historyData}
                renderItem={({ item }) => (
                    <Item id={item.id} name={item.user.name} date={item.createdAt_date} time={item.createdAt_time} />
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