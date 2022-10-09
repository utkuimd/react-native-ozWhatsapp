import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './Statuss.style';

const Statuss = ({status}) => {
  const { theme } = useSelector(state => state.theme);
  const navigation = useNavigation();

  const noGMT = new Date(status.date * 1000);
  const date = new Date(noGMT.getUTCFullYear(), noGMT.getUTCMonth(), noGMT.getUTCDate(), noGMT.getUTCHours() + 3, noGMT.getUTCMinutes(), noGMT.getUTCSeconds()).toUTCString();

  const openStatus = () => {
    navigation.navigate('OpenStatusScreen', {imageURL: status.imageURL})
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={openStatus}>
      <Image style={styles.statusPreview} source={{uri: status.imageURL}}/>
      <View>
        <Text style={[styles.senderID, {color: theme.color}]}>{status.senderID}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Statuss;
