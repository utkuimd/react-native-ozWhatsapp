import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './Verify.style';

const Verify = () => {
    const route = useRoute();
    const phoneNumber = route.params.phoneNumber;
  return (
    <ImageBackground style={styles.container} source={{uri: 'https://img.freepik.com/free-vector/white-gray-geometric-pattern-background_53876-115288.jpg?w=360'}}>
        <Text>{phoneNumber}</Text>
    </ImageBackground>
  )
}

export default Verify;
