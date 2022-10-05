import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import styles from './Messages.style';

const Messages = () => {
  const navigation = useNavigation();
  const { theme } = useSelector(state => state.theme);

  const gotoContacts = () => {
    navigation.navigate('ContactListScreen');
  }
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TouchableOpacity style={[styles.newMessage, {backgroundColor: theme.headerColor}]} onPress={gotoContacts}>
        <Entypo name="new-message" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Messages;
