import React from 'react';
import { View, Text, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../../utils/slices/userSlice';
import { setAuthComp } from '../../../utils/slices/authCompSlice';

import { auth } from '../../../utils/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Home.style';

const Home = () => {
  const userInRedux = useSelector(state => state.user);
  const authComp = useSelector(state => state.authComp);
  const dispatch = useDispatch();

  const show = async () => {
    if (auth.currentUser) {
      console.log(auth.currentUser.displayName, auth.currentUser.photoURL, auth.currentUser.phoneNumber);
    } else {
      console.log('User sign out!');
    }
    const userInLocal = await AsyncStorage.getItem('user');
    console.log(userInLocal);
    console.log(userInRedux);
    console.log(authComp);
  };

  const logOut = async () => { // Log out process doing here for the time being.
    auth.signOut() // Log out from firebase.
    .then(async () => {  
      await AsyncStorage.removeItem('user'); // If user can logout from firebase, delete user information in local and redux.
      dispatch(logout());
      await AsyncStorage.removeItem('authComp'); // If user can logout from firebase, delete authentication completed information in local and redux.
      dispatch(setAuthComp(null));
    })
    .catch((err) => {Alert.alert(err.message)});
  };
  
  return (
    <View style={{flex: 1, alignItems:'center', justifyContent: 'space-evenly'}}>
      <Text onPress={show}>SHOW USER</Text>
      <Text onPress={logOut}>LOGOUT</Text>
    </View>
  )
}

export default Home