import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAxios } from '../../../utils/hooks/useAxios';
import { useAsyncStorage } from '../../../utils/hooks/useAsyncStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HttpStatusCode } from 'axios';

const Item = ({ id, note, sender, receiver, iotTool, onAccept, onReject }) => (
    <View style={styles.item}>
        <View style={{ flex: 6.5 }}>
            <Text style={styles.title}>From: {sender.name} </Text>
            <Text style={styles.title}>Note:</Text>
            <Text style={styles.title}>{note}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 30, flex: 3.5 }}>
            <TouchableOpacity
                style={{ backgroundColor: 'lime', padding: 5 }}
                onPress={() => onAccept(id, sender, receiver, iotTool)}
            >
                <Icon name="check" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={{ backgroundColor: 'red', padding: 5 }}
                onPress={() => onReject(id, sender, receiver, iotTool)}
            >
                <Icon name="clear" size={30} color="black" />
            </TouchableOpacity>
        </View>
    </View>
);


const Inbox = () => {
    const [inbox, setInbox] = useState([]);

    const { postRequest } = useAxios();
    const { getData, addToExisting } = useAsyncStorage();

    const eraseFromList = (id) => {
        const newData = inbox.filter(item => item.id !== id);
        setInbox(newData);
    };

    const handleAccept = async (id, sender, receiver, iotTool) => {
        try {
            const response = await postRequest(
                'inbox/invitation/accept',
                { invitationId: id, senderId: sender.id, receiverId: receiver.id, iotToolId: iotTool.id }
            );

            if (response.status !== HttpStatusCode.BadRequest) {
                await addToExisting('iot_list', { name: iotTool.serial, serial: iotTool.serial, list_for: receiver.email });
                Alert.alert('Success', 'Invitation accepted');
                eraseFromList(id);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleReject = async (id, sender, receiver, iotTool) => {
        try {
            const response = await postRequest(
                'inbox/invitation/reject',
                { invitationId: id, senderId: sender.id, receiverId: receiver.id, iotToolId: iotTool.id }
            );

            if (response.status !== HttpStatusCode.BadRequest) {
                eraseFromList(id);
                Alert.alert('Success', 'Invitation rejected');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const fetchInbox = useCallback(async () => {
        const user = await getData('user');
        const response = await postRequest('inbox/get', { email: user.email });

        if (response.data) {
            console.log(response.data.messages);
            setInbox(response.data.messages);
        }
    }, [postRequest, getData]);

    useEffect(() => {
        fetchInbox();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inbox</Text>

            {inbox.length > 0 ? (
                <FlatList
                    data={inbox}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            note={item.note}
                            sender={item.sender}
                            receiver={item.receiver}
                            iotTool={item.iot_tool}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            )
                :
                (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Your inbox is empty</Text>
                    </View>
                )}
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
        alignContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        gap: 30,
    },
    title: {
        fontSize: 18,
        color: 'black',
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
});

export default Inbox;
