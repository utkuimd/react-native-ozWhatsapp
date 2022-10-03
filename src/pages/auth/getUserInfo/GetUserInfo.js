import React, { useState } from 'react';
import { ImageBackground, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../utils/firebase';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../utils/slices/userSlice';

import Entypo from '@expo/vector-icons/Entypo';
import styles from './GetUserInfo.style';


const GetUserInfo = () => {
  const [ profileImage, setProfileImage ] = useState(null);
  const [ imageLoading, setImageLoading ] = useState(false);
  const [ fullName, setFullName ] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageLoading(true); // Prevent user make a process.
      const imageURL = await uploadImageAsync(result.uri); // Upload image to firebase storage.
      setProfileImage(imageURL); // Set uploaded picture as profile image of user.
      setTimeout(() => { setImageLoading(false) }, 2000); // Let user make a process.
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(storage, uuid.v4());
    await uploadBytes(fileRef, blob);
    blob.close();
  
    return await getDownloadURL(fileRef);
  };

  const gotoPhone = () => {
    if ( fullName !== '' && isOnlyLetterSpace(fullName) !== false ) { // Make process if full name not empty and contains only letters.
      if ( profileImage !== null ) {
        // If user choose a profile image send this image URL to redux.
        dispatch(updateUser({profileImage}));
      } else {
        // If user does not choose any profile image send default image URL to redux.
        dispatch(updateUser({profileImage: 'https://divedigital.id/wp-content/uploads/2022/07/1-Blank-TikTok-Default-PFP.jpg'}))
      }
      dispatch(updateUser({fullName})); // Send user full name to redux.
      console.log('saved user information');
      navigation.navigate('GetPhoneNumScreen');
    } else {
      Alert.alert('Warning','You must enter your full name and your full name must be only letters.');
    }
  };

  const isOnlyLetterSpace = (str) => {
    return /^[A-zÖöÇçŞşİĞğÜü ]*$/.test(str); // Check the string contain only uppercase and lowercase letters, spaces and turkish characters.
  };

  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
      
      <View style={styles.allAreas}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>User Information</Text>
          <Text style={styles.desciption}>Please enter your full name and choose a profile picture if you want.</Text>
        </View>

        {
          // Choose profile image area
          profileImage !== null ? (
            // You can see your selected profile image and you can choose another image.
            <TouchableOpacity style={styles.chooseArea} onPress={pickImage}>
              <Image style={styles.profileImage} source={{uri: profileImage}}/>
            </TouchableOpacity>
          ) : (
            // When page first loaded you will see beautiful "add image icon" and you are able to choose your profile image from here.
            <TouchableOpacity style={styles.chooseArea} onPress={pickImage}>
              <Image style={styles.addProfileImage} source={require('../../../../assets/add-camera-icon.png')}/>
            </TouchableOpacity>
          )
        }

        <View style={styles.getFullNameArea}>
          <View style={styles.getFullName}>
            <TextInput 
              placeholder='Enter your fullname'
              placeholderTextColor='#bdbebd'
              maxLength={30}
              onChangeText={setFullName}
              value={fullName}
              style={styles.fullName}
            />
            <Text style={styles.remainLetter}>{30 - fullName.length}</Text>
          </View>
          <View style={styles.underline}/>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={gotoPhone}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {
        // Image loading screen, this screen prevents user make process.
        imageLoading === true ? (
          <View style={[ StyleSheet.absoluteFill, styles.loadingScreen ]}>
            <View style={styles.loadingScreenDiv}>
              <Text style={styles.loadingScreenText}>Please Wait...</Text>
              <Entypo name="rocket" size={40} color="orange"/>
            </View>
          </View>
        ) : (
          // If user does not uploading any picture, do not render anything.
          <View style={{display: 'none'}}/>
        )
      }

    </ImageBackground>
  )
}

export default GetUserInfo;
