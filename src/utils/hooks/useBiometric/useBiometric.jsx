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

    const createKeys = async () => {
        try {
            const resultObject = await rnBiometrics.createKeys();
            const { publicKey } = resultObject;
            return publicKey;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const deleteKeys = async () => {
        await rnBiometrics.deleteKeys()
            .then((resultObject) => {
                const { keysDeleted } = resultObject;

                if (keysDeleted) {
                    console.log('Successful deletion');
                } else {
                    console.log('Unsuccessful deletion because there were no keys to delete');
                }
            });
    };

    const simplyPrompt = async () => {

        try {
            const resultObject = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
            const { success } = resultObject;

            if (success) {
                console.log('successful biometrics provided');
            } else {
                console.log('user cancelled biometric prompt');
            }

            return success;
        } catch (error) {
            console.log('Prompt failed');
        }
    };

    return {
        checkBiometrics,
        checkBiometricKeyExist,
        createKeys,
        deleteKeys,
        simplyPrompt,
    };
};

export default useBiometric;
