import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateContact } from '../../utils/slices/chosenContactSlice';
import styles from './Contacts.style';

const Contacts = ({contact}) => {
  const { theme } = useSelector(state => state.theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const gotoMessageScreen = () => {
    dispatch(updateContact(contact)); // Contact chosen and write contact information to redux.
    navigation.pop(); // Preventing to back to contact list screen thus user will direct to messages screen.
    navigation.navigate('MessageScreen'); // Go to personel message screen.
  };

  return (
    <TouchableOpacity style={styles.container} onPress={gotoMessageScreen}>
      <Image style={styles.image} source={{uri: contact.photo}}/>
      <View style={styles.details}>
        <Text style={[styles.pN, {color: theme.color}]}>{contact.phoneNumber}</Text>
        <Text style={styles.about}>{contact.about}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Contacts;
