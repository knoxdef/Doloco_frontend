import React, { useState } from 'react'
import CustomButton from '../../../buttonInputs/CustomButton';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.root}>
                <Text style={styles.headSignIn}>Forgot Password</Text>

                <TextInput
                    style={styles.inputCointainer}
                    placeholder="Email"
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.inputCointainer}
                    placeholder="Password"
                    placeholderTextColor={'grey'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.inputCointainer}
                    placeholder="ConfirmPassword"
                    placeholderTextColor={'grey'}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />

                {/* {loading ? (
                    <ActivityIndicator size="large" color="#000ff" />
                ) : ( */}
                <Pressable onPress={''} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </Pressable>
                {/* )} */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFBE9',
    },
    inputCointainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: 'black',
    },
    buttonContainer: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#AD8B73',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
    },
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15,
    },
    headSignIn: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'black',
    },
    bottomButton: {
        padding: 20,
    },
});

export default ForgotPassword