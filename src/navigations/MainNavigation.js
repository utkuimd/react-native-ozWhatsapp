import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Messages } from '../pages';
import { Status } from '../pages';
import SettingsStackNav from './SettingsNavigation';

const Tab = createMaterialTopTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'orange',
                },
                tabBarIndicatorStyle: { backgroundColor: 'white', height: 4 }
            }}>
            <Tab.Screen
                name='MessagesScreen'
                component={Messages}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarLabelStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 14,
                    },
                }}
            />
            <Tab.Screen
                name='StatusScreen'
                component={Status}
                options={{
                    tabBarLabel: 'Status',
                    tabBarLabelStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 14,
                    }
                }}
            />
            <Tab.Screen
                name='SettingsScreens'
                component={SettingsStackNav}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: 'white',
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigation;
