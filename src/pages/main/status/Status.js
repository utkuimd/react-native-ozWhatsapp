import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../utils/firebase';
import uuid from 'react-native-uuid';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { ImageLoading } from '../../../components';
import { Statuss } from '../../../components';
import { setAllStatus } from '../../../utils/slices/allStatus';
import styles from './Status.style';

const Status = () => {
  const { theme } = useSelector(state => state.theme);
  const userInRedux = useSelector(state => state.user);
  const allStatus = useSelector(state => state.allStatus);
  const [ statusLoading, setStatusLoading ] = useState(false);
  const dispatch = useDispatch();

  const phoneNumber = userInRedux.user.phoneNumber;
  const dateNowMS = new Date().getTime();

  const addStatus = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setStatusLoading(true);
      const imageURL = await uploadImageAsync(result.uri);
      addCollection(imageURL);
      setTimeout(() => {setStatusLoading(false); getStatus();}, 2000);
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

  const addCollection = async (imageURL) => {
    await addDoc(collection(db, 'status'), {
      senderID: phoneNumber,
      imageURL,
      date: serverTimestamp(),
    })
  };

  const getStatus = async () => {
    const querySnapShot = await getDocs(collection(db, 'status'));
    const _allStatus = [];
    querySnapShot.forEach(async (status) => {
      const statusData = {
        senderID: status.data().senderID,
        imageURL: status.data().imageURL,
        date: status.data().date.seconds,
      }
      // If status date in ms bigger than current time in ms, status is not expired yet.
      // Write these status to empty array.
      if((status.data().date.seconds + 86400) * 1000 > dateNowMS) {
        _allStatus.push(statusData)
      } else {
        // If status is expired, delete the status in firestore and do not write to empty array.
        await deleteDoc(doc(db, 'status', status.id));
      }
    });
    dispatch(setAllStatus(_allStatus));
  };
 
  useEffect (() => {
    getStatus();
  }, []);

  const renderStatus = ({item}) => <Statuss status={item}/>
  const separatorHeader = () => <View style={[styles.separatorHeader, {borderColor: theme.divColor}]}/>

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

      <TouchableOpacity style={styles.addStatusBtn} onPress={addStatus}>
        <View style={[styles.addStatusIcon, {backgroundColor: theme.divColor}]}>
          <FontAwesome name="plus" size={30} color="white" />
        </View>
        <View>
          <Text style={[styles.myStatus, {color: theme.color}]}>My Status</Text>
          <Text style={styles.tapToAdd}>Tap to add status</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={allStatus.allStatus}
        renderItem={renderStatus}
        ListHeaderComponent={separatorHeader}
      />

      <ImageLoading loading={statusLoading}/>

    </SafeAreaView>
  )
}

export default Status;
