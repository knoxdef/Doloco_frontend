import messaging from '@react-native-firebase/messaging';

const useNotifications = () => {
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const generateFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    return token;
  };

  return {
    requestPermission,
    generateFCMToken,
  };
};

export default useNotifications;
