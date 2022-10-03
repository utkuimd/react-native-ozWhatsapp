import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNav from './AuthNavigation';
import MainStackNav from './MainNavigation';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/slices/userSlice';
import { setAuthComp } from '../utils/slices/authCompSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const dispatch = useDispatch();
    const authComp = useSelector(state => state.authComp);

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
        <Stack.Navigator screenOptions={{headerShown: false}}>
            { (authComp.authComp) ? ( // If user completed authentication process, show main screens. 
                <Stack.Screen name='MainScreens' component={MainStackNav} />
            ) : (
                <Stack.Screen name='AuthScreens' component={AuthStackNav} />
            ) }
        </Stack.Navigator>
    )
}

export default AppNavigation;
