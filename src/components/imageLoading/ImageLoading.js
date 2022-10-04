import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from './ImageLoading.style';

const ImageLoading = ({loading}) => {
  return (
      // Image loading screen, this screen prevents user make process.
      loading ? (
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
  )
}

export default ImageLoading;
