import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../../utils/slices/userSlice';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../utils/firebase';
import uuid from 'react-native-uuid';

import { ImageLoading } from '../../../../components';

import { updateProfile } from 'firebase/auth';
import { auth } from '../../../../utils/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './EditProfile.style';

const EditProfile = () => {
  const [ fullNameState, setFullNameState ] = useState('');
  const [ profileImageState, setProfileImageState ] = useState(null);
  const [ imageLoading, setImageLoading ] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);

  const profileImage = userInRedux.user.profileImage;
  const fullName = userInRedux.user.fullName;
  const phoneNumber = userInRedux.user.phoneNumber;

  const goBack = () => {
    navigation.goBack();
  };

  const saveChanges = () => {
    if ( fullNameState !== '' && isOnlyLetterSpace(fullNameState) ) {
      // First update user information in firebase.
      updateProfile(auth.currentUser, {
        displayName: fullNameState,
        photoURL: profileImageState
      }).then(() => {
        // Then, update user information in redux.
        dispatch(updateUser({profileImage: profileImageState})); 
        dispatch(updateUser({fullName: fullNameState}));
        // Update user information in local storage.
        AsyncStorage.setItem('user', JSON.stringify({"user": {"fullName": fullNameState, "phoneNumber": phoneNumber, "profileImage": profileImageState}}));
        navigation.goBack();
        console.log('OK');
      }).catch((err) => {
        Alert.alert(err.message);
      })
    } else {
      Alert.alert('Warning','You must enter your full name and your full name must be only letters.');
    }
  };

  const isOnlyLetterSpace = (str) => {
    return /^[A-zÖöÇçŞşİıĞğÜü ]*$/.test(str); // Check the string contain only uppercase and lowercase letters, spaces and turkish characters.
  };

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
      setProfileImageState(imageURL); // Set uploaded picture as profile image of user.
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

  useEffect(() => { // When the page is first loaded, get old user data(profileImage and fullName) and show.
    setProfileImageState(profileImage);
    setFullNameState(fullName);
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <View style={styles.userDetailsArea}>
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.profileImage} source={{uri: profileImageState}}/>
        </TouchableOpacity>

        <View style={styles.getFullNameArea}>
          <View style={styles.getFullName}>
            <TextInput 
              placeholder='Enter your fullname'
              placeholderTextColor='#bdbebd'
              maxLength={30}
              onChangeText={setFullNameState}
              value={fullNameState}
              style={[styles.fullName, {color: theme.color}]}
            />
            <Text style={[styles.remainLetter, {color: theme.color}]}>{30 - fullNameState.length}</Text>
          </View>
          <View style={styles.underline}/>
        </View>
      </View>
      
      <View style={styles.buttonsArea}>
        <TouchableOpacity style={styles.saveChangesBtn} onPress={saveChanges}>
          <Text style={styles.saveChangesText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dontSaveBtn} onPress={goBack}>
          <Text style={[styles.dontSaveText, {color: theme.color}]}>Don't Save, Go Back</Text>
        </TouchableOpacity>
      </View>
      {/* When profile image is loading, prevent user make some process.
      Example: User can travel between top tabs but can't make anything on this page. */}
      <ImageLoading loading={imageLoading} />
    </SafeAreaView>
  )
}

export default EditProfile;
