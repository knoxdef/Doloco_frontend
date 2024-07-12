import { ActivityIndicator, Dimensions, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage, useAxios } from '../../../utils/hooks';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';

const FormChangePin = ({ route, navigation }) => {
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { serial } = route?.params;

    const { postRequest } = useAxios();
    const { getData } = useAsyncStorage();

    const handleSubmit = async () => {
        setLoading(true);
        Keyboard.dismiss();

        if (!validate()) {
            setLoading(false);
            return;
        }

        const response = await postRequest('access/update/pin', {
            email: user.email,
            serial: serial,
            old_pin: oldPin,
            new_pin: newPin,
        });

        if (response.status === 200) {
            setLoading(false);

            setShowAlert(true);
            setAlertTitle('Success');
            setAlertMessage('Pin Updated Successfully.');

            setOldPin('');
            setNewPin('');
            setConfirmPin('');
        } else {
            setLoading(false);

            setShowAlert(true);
            setAlertTitle('Error');
            setAlertMessage('Pin Update Failed.');
        }

    };

    const validate = () => {
        const newErrors = {};

        if (!oldPin) {
            newErrors.oldPin = 'Pin Must Be Filled.';
        } else if (oldPin.length !== 6) {
            newErrors.oldPin = 'Old Pin must be 6 digits.';
        }

        if (!newPin) {
            newErrors.newPin = 'Pin Must Be Filled.';
        } else if (newPin.length !== 6) {
            newErrors.newPin = 'New Pin must be 6 digits.';
        } else if (newPin === oldPin) {
            newErrors.newPin = 'New Pin must be different from Old Pin.';
        }

        if (!confirmPin) {
            newErrors.confirmPin = 'Pin Must Be Filled.';
        } else if (confirmPin !== newPin) {
            newErrors.confirmPin = 'Confirm Pin must match New Pin.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const fetchUser = useCallback(async () => {
        const response = await getData('user');
        setUser(response);
    }, [getData]);

    useEffect(() => {
        fetchUser();
        return () => {
            fetchUser();
        };
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <AwesomeAlert
                show={showAlert}
                title={alertTitle}
                titleStyle={{
                    color:
                        alertTitle === 'Success'
                            ? 'green'
                            : alertTitle === 'Error'
                                ? 'red'
                                : 'orange',
                    fontSize: 30,
                    fontWeight: 'bold',
                }}
                message={alertMessage}
                showConfirmButton={alertTitle === 'Success'}
                showCancelButton={alertTitle === 'Error' || alertTitle === 'Warning'}
                confirmButtonColor={'green'}
                cancelButtonColor={alertTitle === 'Error' ? 'red' : 'orange'}
                confirmText={'Back To Control Page'}
                cancelText={'Close'}
                onConfirmPressed={() => {
                    setShowAlert(false);
                    navigation.goBack();
                }}
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                closeOnTouchOutside={false}
            />

            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Old Pin</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={styles.input}
                        onChangeText={val => {
                            setOldPin(val);
                        }}
                        value={oldPin}
                        placeholder="Input Your Pin Number..."
                        placeholderTextColor={'gray'}
                    />
                    {errors.oldPin && <Text style={styles.errorText}>{errors.oldPin}</Text>}
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.text}>New Pin</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={styles.input}
                        onChangeText={val => {
                            setNewPin(val);
                        }}
                        value={newPin}
                        placeholder="Input Your Pin Number..."
                        placeholderTextColor={'gray'}
                    />
                    {errors.newPin && <Text style={styles.errorText}>{errors.newPin}</Text>}
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Confirm Pin</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={styles.input}
                        onChangeText={val => {
                            setConfirmPin(val);
                        }}
                        value={confirmPin}
                        placeholder="Input Your Pin Number..."
                        placeholderTextColor={'gray'}
                    />
                    {errors.confirmPin && <Text style={styles.errorText}>{errors.confirmPin}</Text>}
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#000ff" />
                ) : (
                    <Pressable
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.text}>Sumbit</Text>
                    </Pressable>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        gap: 20,
        flexGrow: 1,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        color: 'black',
    },
    submitButton: {
        width: '80%',
        paddingVertical: 15,
        borderWidth: 3,
        borderRadius: Dimensions.get('window').width,
        borderColor: '#AD8B73',
        backgroundColor: '#E3CAA5',
        alignItems: 'center',
    },
    containerInput: {
        width: Dimensions.get('window').width * 0.7,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default FormChangePin;
