import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Settings } from '../pages';
import { EditProfile } from '../pages';

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='SettingsScreen' component={Settings}/>
            <Stack.Screen name='EditProfileScreen' component={EditProfile}/>
        </Stack.Navigator>
    )
}

export default SettingsNavigation;
