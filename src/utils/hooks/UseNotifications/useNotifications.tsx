import {PermissionsAndroid} from 'react-native';


import { View, Text } from 'react-native'
import React from 'react'

const useNotifications = () => {

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  return (
    <View>
      <Text>useNotifications</Text>
    </View>
  )
}

export default useNotifications