import React from 'react';
import { SafeAreaView, View, Text, Alert, Image, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../../utils/slices/userSlice';
import { setAuthComp } from '../../../utils/slices/authCompSlice';

import { auth } from '../../../utils/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './Settings.style';

const Settings = () => {
  const userInRedux = useSelector(state => state.user);
  const authComp = useSelector(state => state.authComp);
  const dispatch = useDispatch();

  const profileImage = userInRedux.user.profileImage;
  const fullName = userInRedux.user.fullName;

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
    <SafeAreaView style={styles.container}>

      <View style={styles.userArea}>
        <Image style={styles.profileImage} source={{uri: profileImage}}/>
        <Text style={styles.fullName}>{fullName}</Text>
      </View>
      
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={show}>
          <FontAwesome5 name="user-cog" size={27} color="#bdbebd" />
          <Text style={styles.buttonText}>Edit your profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={null}>
          <FontAwesome5 name="sun" size={33} color="#bdbebd" />
          <Text style={styles.buttonText}>Change Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOutBtn} onPress={null}>
          <FontAwesome5 name="door-open" size={30} color="#ff5232"/>
          <Text style={styles.logOutBtnText}>Log out...</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default Settings;
