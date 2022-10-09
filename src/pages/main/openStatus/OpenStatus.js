import React from 'react';
import { SafeAreaView, Pressable, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import styles from './OpenStatus.style';

const OpenStatus = () => {
  const { theme } = useSelector(state => state.theme);
  const navigation = useNavigation();
  const route = useRoute();
  const imageURL = route.params.imageURL;

  const goBack = () => {
    navigation.goBack();
  };

  return ( // User can see own or other people's status in large screen.
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Pressable style={[styles.backButton, {backgroundColor: theme.divColor}]} onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
      </Pressable>
      <Image style={styles.image} source={{uri: imageURL}}/>
    </SafeAreaView>
  )
}

export default OpenStatus;
