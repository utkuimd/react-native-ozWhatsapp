import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Messages, Status } from '../pages';
import SettingsStackNav from './SettingsNavigation';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const MainNavigation = () => {
    const { theme } = useSelector(state => state.theme);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.headerColor,
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
