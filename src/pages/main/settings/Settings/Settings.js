import React, { useState } from 'react';
import { SafeAreaView, View, Text, Alert, Image, TouchableOpacity, Switch } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { logout } from '../../../../utils/slices/userSlice';
import { setAuthComp } from '../../../../utils/slices/authCompSlice';
import { toggleTheme } from '../../../../utils/slices/themeSlice';

import { auth } from '../../../../utils/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './Settings.style';

const Settings = () => {
  const [ handleTheme, setHandleTheme ] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authComp = useSelector(state => state.authComp);
  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);

  const profileImage = userInRedux.user.profileImage;
  const fullName = userInRedux.user.fullName;
  const phoneNumber = userInRedux.user.phoneNumber;

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
    console.log(theme.type);
  };

  const logOut = async () => { // Log out process doing here for the time being.
    auth.signOut() // Log out from firebase.
    .then(async () => {
      await AsyncStorage.removeItem('authComp'); // If user can logout from firebase, delete authentication completed information in local and redux.
      dispatch(setAuthComp(null));
      await AsyncStorage.removeItem('user'); // If user can logout from firebase, delete user information in local and redux.
      dispatch(logout());
    })
    .catch((err) => {Alert.alert(err.message)});
  };

  const gotoEdit = () => {
    navigation.navigate('EditProfileScreen');
  };
  
  const changeTheme = () => {
    setHandleTheme(!handleTheme);
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <View style={styles.userArea}>
        <Image style={styles.profileImage} source={{uri: profileImage}} onPress={show}/>
        <Text style={[styles.text, {color: theme.color}]}>{fullName}</Text>
        <Text style={[styles.text, {color: theme.color}]}>{phoneNumber}</Text>
      </View>
      
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={gotoEdit}>
          <FontAwesome5 name="user-cog" size={27} color="#bdbebd" />
          <Text style={styles.buttonText}>Edit Your Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={changeTheme}>
          <FontAwesome5 name="sun" size={33} color="#bdbebd" />
          <Text style={styles.buttonText}>Change Theme</Text>
          <Switch
            trackColor={{ false: '#bdbebd', true: 'crimson' }}
            thumbColor='white'
            ios_backgroundColor='#3e3e3e'
            onValueChange={changeTheme}
            value={handleTheme}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
          <FontAwesome5 name="door-open" size={30} color="#ff5232"/>
          <Text style={styles.logoutText}>Log out...</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default Settings;
