import React, { useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNav from './AuthNavigation';
import MainStackNav from './MainNavigation';
import { ContactList, MessageScreen } from '../pages';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/slices/userSlice';
import { setAuthComp } from '../utils/slices/authCompSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const dispatch = useDispatch();
    const authComp = useSelector(state => state.authComp);
    const { theme } = useSelector(state => state.theme);
    const chosenContact = useSelector(state => state.chosenContact);

    const getUser = async () => { // Write user information to redux from local.
        const userInLocal = await AsyncStorage.getItem('user');
        const isUser = userInLocal ? JSON.parse(userInLocal).user : null;
        dispatch(updateUser(isUser));
    };

    const isAuthCompleted = async () => { // Write authentication completed information to redux from local.
        const authCompLocal = await AsyncStorage.getItem('authComp');
        const _isAuthCompleted = authCompLocal ? authCompLocal : null;
        dispatch(setAuthComp(_isAuthCompleted));
        console.log(authComp);
    };

    useEffect(() => { // When app first loaded,
        isAuthCompleted(); // Get authentication completed information.
        getUser(); // Get user information.
    }, []);

    return (
        <Stack.Navigator>
            { (authComp.authComp) ? ( // If user completed authentication process, show main screens. 
                <Stack.Screen
                    name='MainScreens'
                    component={MainStackNav}
                    options={{
                        headerTitle: 'ozWhatsapp',
                        headerTitleAlign: 'center',
                        headerTitleStyle: { color: 'white', fontSize: 21 },
                        headerStyle: { backgroundColor: theme.headerColor },
                        headerShadowVisible: false,
                    }}
                />
            ) : (
                <Stack.Screen
                    name='AuthScreens'
                    component={AuthStackNav}
                    options={{headerShown: false}}
                />
            ) }
            <Stack.Screen
                name='ContactListScreen'
                component={ContactList}
                options={{
                    headerTitle: 'Select contact',
                    headerStyle: { backgroundColor: theme.headerColor },
                    headerTitleStyle: { color: 'white', fontSize: 21 },
                    headerTintColor: 'white'
                }}
            />
            <Stack.Screen
                name='MessageScreen'
                component={MessageScreen}
                options={{
                    headerTitle: chosenContact.chosenContact.phoneNumber, // It comes from chosen contact slice.
                    headerStyle: { backgroundColor: theme.headerColor },
                    headerTitleStyle: { color: 'white', fontSize: 21 },
                    headerTintColor: 'white',
                    headerRight: () => ( // Added photo of contact on the right with headerRight.
                        <Image
                            style={{
                                width: Dimensions.get('screen').width / 10,
                                height: Dimensions.get('screen').width / 10,
                                borderRadius: Dimensions.get('screen').width / 20,
                                marginRight: 10
                            }}
                            source={{uri: chosenContact.chosenContact.photo}} // It comes from chosen contact slice.
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigation;
