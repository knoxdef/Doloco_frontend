import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../../organisms';

const ProfileStackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="profile">
            <Stack.Screen
                name="profile"
                component={Profile}
                options={() => ({
                    title: 'Profile',
                    contentStyle: { backgroundColor: '#FFFBE9' },
                })}
            />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigation;
