import React, { useState } from 'react';
import CustomButton from '../../../buttonInputs/CustomButton';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import { useAxios } from '../../../utils/hooks/useAxios';
import { HttpStatusCode } from 'axios';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { postRequest } = useAxios();

    const navigation = useNavigation();

    const validate = () => {
        const newErrors = {};

        if (!email.includes('@')) {
            newErrors.email = 'Email must be a valid email address.';
        }
        if (password.length < 7) {
            newErrors.password = 'Password must be at least 7 characters long.';
        }
        if (confirmPassword.length < 7) {
            newErrors.confirmPassword = 'Password must be at least 7 characters long.';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const forgotPasswordHandler = async () => {
        setLoading(true);

        if (!validate()) {
            setLoading(false);
            return;
        }

        try {
            const response = await postRequest('password-reset', {
                email: email,
                new_password: password,
                confirm_password: confirmPassword
            });

            if (response.status === HttpStatusCode.Ok) {
                setAlertTitle('Success');
                setAlertMessage('Password has been changed, click button below to continue');
                setShowAlert(true);
            } else {
                throw new Error('Failed to reset password');
            }
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage('Reset password failed');
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const backHome = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <AwesomeAlert
                show={showAlert}
                title={alertTitle}
                titleStyle={{ color: alertTitle === 'Success' ? 'green' : 'red', fontSize: 30, fontWeight: 'bold' }}
                message={alertMessage}
                showConfirmButton={true}
                confirmButtonColor={alertTitle === 'Success' ? 'green' : 'red'}
                confirmText='Back to Login'
                onConfirmPressed={backHome}
                closeOnTouchOutside={false}
            />

            <View style={styles.root}>
                <Text style={styles.headSignIn}>Forgot Password</Text>

                <TextInput
                    style={styles.inputContainer}
                    placeholder="Email"
                    placeholderTextColor={'grey'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                
                <TextInput
                    style={styles.inputContainer}
                    placeholder="New Password"
                    placeholderTextColor={'grey'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                
                <TextInput
                    style={styles.inputContainer}
                    placeholder="Confirm Password"
                    placeholderTextColor={'grey'}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                {loading ? (
                    <ActivityIndicator size="large" color="#000ff" />
                ) : (
                    <Pressable onPress={forgotPasswordHandler} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </Pressable>
                )}

                <CustomButton
                    text="Click here to go back to login page"
                    onPress={() => navigation.navigate('Login')}
                    type="TERTIARY"
                />
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
    inputContainer: {
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginVertical: 5,
    },
});

export default ForgotPassword;
