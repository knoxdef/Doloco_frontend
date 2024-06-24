import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const useBiometric = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const checkBiometrics = async () => {
        try {
            const resultObject = await rnBiometrics.isSensorAvailable();

            const { available, biometryType } = resultObject;

            if (available && biometryType === BiometryTypes.Biometrics) {
                console.log('Biometrics is supported');
            } else {
                console.log('Biometrics not supported');
            }

            return available;

        } catch (error) {
            console.log('Error:', error);
        }
    };

    const checkBiometricKeyExist = async () => {
        try {
            const resultObject = await rnBiometrics.biometricKeysExist();

            const { keysExist } = resultObject;

            if (keysExist) {
                console.log('Keys exist');
            } else {
                console.log('Keys do not exist or were deleted');
            }

            return keysExist;

        } catch (error) {
            console.log('Error:', error);
        }
    };

    const createKeys = () => {
        rnBiometrics.createKeys()
            .then((resultObject) => {
                const { publicKey } = resultObject;
                console.log(publicKey);
            });
    };

    const deleteKeys = () => {
        rnBiometrics.deleteKeys()
            .then((resultObject) => {
                const { keysDeleted } = resultObject;

                if (keysDeleted) {
                    console.log('Successful deletion');
                } else {
                    console.log('Unsuccessful deletion because there were no keys to delete');
                }
            });
    };

    const simplyPrompt = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject;

                if (success) {
                    console.log('successful biometrics provided');
                } else {
                    console.log('user cancelled biometric prompt');
                }
            })
            .catch(() => {
                console.log('biometrics failed');
            });
    };

    const createSignature = (message, payload) => {
        rnBiometrics.createSignature({
            promptMessage: message,
            payload: payload,
        })
            .then((resultObject) => {
                const { success, signature } = resultObject;

                if (success) {
                    console.log(signature);
                }
            });
    };

    return {
        checkBiometrics,
        checkBiometricKeyExist,
        createKeys,
        deleteKeys,
        simplyPrompt,
        createSignature,
    };
};

export default useBiometric;
