import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAxios } from '../../../utils/hooks/useAxios';
import moment from 'moment-timezone';

const Item = ({ name, date, time }) => (
    <View style={styles.item}>
        <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>{date} - {time}</Text>
        </View>
    </View>
);

const History = ({ route }) => {
    const [historyData, setHistoryData] = useState([]);

    const { serial } = route?.params;
    const { postRequest } = useAxios();

    const fetchHistory = useCallback(async () => {
        const response = await postRequest('history/get', { serial: serial });
        const data = response.data.histories;
        const formattedData = data.map(item => ({
            ...item,
            createdAt_date: moment(item.created_at).tz('Asia/Bangkok').format('DD/MM/YYYY'),
            createdAt_time: moment(item.created_at).tz('Asia/Bangkok').format('HH:mm:ss'),
            updatedAt_date: moment(item.updated_at).tz('Asia/Bangkok').format('DD/MM/YYYY'),
            updatedAt_time: moment(item.updated_at).tz('Asia/Bangkok').format('HH:mm:ss'),
        }));
        setHistoryData(formattedData);
    }, [postRequest, serial]);

    useEffect(() => {
        fetchHistory();
        return () => { fetchHistory(); };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            {historyData && historyData.length > 0 ?
                <FlatList
                    data={historyData}
                    renderItem={({ item }) => (
                        <Item name={item.user.name} date={item.createdAt_date} time={item.createdAt_time} />
                    )}
                    keyExtractor={item => item.id}
                />
                :
                (
                    <View style={styles.noListView}>
                        <Text style={styles.noListText}>This Device History Empty</Text>
                        <Text style={styles.noListText}>It seems no usage has been made yet</Text>
                    </View>
                )
            }
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
    noListView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noListText: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '400',
    },
});

export default History;
