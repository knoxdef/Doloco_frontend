import React, {useEffect} from 'react';
import {Navigator} from './src/components/navigations/_Navigator';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

function App(): React.JSX.Element {
  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'A new FCM message arrived in the foreground!',
        JSON.stringify(remoteMessage),
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'A new FCM message arrived in the background!',
        JSON.stringify(remoteMessage),
      );
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        title: remoteMessage.data?.title,
        message: remoteMessage.data?.body,
      });
    });

    return unsubscribe;
  }, []);

  return <Navigator />;
}

export default App;
