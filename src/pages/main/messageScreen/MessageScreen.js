import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './MessageScreen.style';

const MessageScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>MessageScreen</Text>
    </View>
  )
}

export default MessageScreen;
