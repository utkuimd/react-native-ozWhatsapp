import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { auth } from '../../../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import styles from './Hello.style';

const Hello = () => {
  const navigation = useNavigation();
  const userInRedux = useSelector(state => state.user);
  const authComp = useSelector(state => state.authComp);

  const gotoUserInfo = () => {
    navigation.navigate('GetUserInfoScreen');
  };

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

  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
      
      <Text style={styles.title}>Welcome to <Text style={styles.subTitle}>oz</Text>Whatsapp!</Text>
      
      <Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1619658535018-5a55d32e4628?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=401&q=80'}} />
      
      <TouchableOpacity style={styles.continueBtn} onPress={gotoUserInfo}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.developer}>
        <Text>from</Text>
        <Text style={styles.devText} onPress={show}>github.com/utkuimd</Text>
      </View>

    </ImageBackground>
  )
}

export default Hello;
